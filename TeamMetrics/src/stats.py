from datetime import datetime, timedelta
from PIL import Image
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import datetime
import math

def get_month_string_from_week_index(week):
    d = f'2013-W{week}'
    r = datetime.datetime.strptime(d + '-1', '%G-W%V-%u')
    month_string = r.strftime("%B")
    return month_string

def get_month_ticks_from_week_time_series(week_vector):
    week_vector_adjusted = []
    start_week = min(week_vector)
    min_week = min(week_vector)
    prev_month = get_month_string_from_week_index(min_week - 4)
    for i in range(1, 4):
        current_month = get_month_string_from_week_index(min_week - 4 + i)
        if current_month != prev_month:
            start_week = min_week - 4 + i
            break
    end_week = max(week_vector)
    week_tick_vector = []
    month_iter = get_month_string_from_week_index(start_week)
    week_tick_vector.append(start_week)
    for week in range(start_week, end_week + 1):
        current_month_name = get_month_string_from_week_index(week)
        if current_month_name != month_iter:
            week_vector_adjusted.append(week)
            month_iter = current_month_name
    month_vector = [get_month_string_from_week_index(week) for week in week_vector_adjusted]
    return week_vector_adjusted, month_vector

def get_time_string_from_hour_index(hour):
  if hour < 10:
    return f"0{hour}:00"
  else:
    return f"{hour}:00"

def get_time_interval_from_hour_index(hour):
  return f"{get_time_string_from_hour_index(hour)}-{get_time_string_from_hour_index((hour + 1) % 24)}"

def get_concat_h(im1, im2):
    dst = Image.new('RGB', (im1.width + im2.width, im1.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (im1.width, 0))
    return dst

def get_concat_v(im1, im2):
    dst = Image.new('RGB', (im1.width, im1.height + im2.height))
    dst.paste(im1, (0, 0))
    dst.paste(im2, (0, im1.height))
    return dst

def get_week_number(date):
    year, week, weekday = date.isocalendar()
    if week == 1 and date.month == 12:
        year += 1
    return week, year

def get_accumulators(sessions, employee_id, prev_correlations, id_list):
    sessions_filtered = [session for session in sessions if session['id'] == employee_id]
    accumulator_day_of_year = {}
    accumulator_weekday_hour = {}
    accumulator_weekday_minutes = {}
    accumulator_weekday = {}
    accumulator_hour = {}
    time_serie_year_week_based = {}
    correlation = {}

    for id in id_list:
        if id in prev_correlations:
            correlation[id] = prev_correlations[id][employee_id]
        else:
            correlation[id] = 0
    
    for session_filtered in sessions_filtered:
        filtered_stop = session_filtered['date']
        filtered_start = filtered_stop - timedelta(seconds=session_filtered['duration'])
        for session in sessions:
            if session['id'] not in id_list or session['id'] in prev_correlations:
                continue

            stop = session['date']
            start = stop - timedelta(seconds=session['duration'])
            duration_minutes = math.ceil(session['duration'] / 60)
            
            if not stop < filtered_start and not start > filtered_stop:
                date_iterator = start
                for _ in range(duration_minutes):
                    if date_iterator < filtered_stop and date_iterator > filtered_start:
                        correlation[session['id']] += 1
                    date_iterator += timedelta(minutes=1)

    for session in sessions_filtered:
        week, year = get_week_number(session['date'])

        if year not in time_serie_year_week_based:
            time_serie_year_week_based[year] = {}
        if week in time_serie_year_week_based[year]:
            time_serie_year_week_based[year][week] += session['duration']
        else:
            time_serie_year_week_based[year][week] = session['duration']

    for day in range(365):
        accumulator_day_of_year[day] = 0

    for hour in range(24):
        accumulator_hour[hour] = 0

    for day in range(7):
        accumulator_weekday[day] = 0
        accumulator_weekday_hour[day] = {}
        for hour in range(24):
            accumulator_weekday_hour[day][hour] = 0
    
    for day in range(7):
        accumulator_weekday_minutes[day] = {}
        for minute in range(24*60):
            accumulator_weekday_minutes[day][minute] = 0

    for session in sessions_filtered:
        date = session['date']
        duration_delta = timedelta(seconds=session['duration'])
        duration_minutes = int(session['duration'] / 60)
        date_iterator = date - duration_delta
        for minute in range(duration_minutes):
            current_weekday = date_iterator.weekday()
            current_hour = date_iterator.hour
            current_minute = date_iterator.minute + current_hour*60
            day_of_year = date_iterator.timetuple().tm_yday - 1
            accumulator_day_of_year[day_of_year] += 1
            year = date_iterator.year
            accumulator_weekday_hour[current_weekday][current_hour] += 1
            accumulator_weekday_minutes[current_weekday][current_minute] += 1
            accumulator_weekday[current_weekday] += 1
            accumulator_hour[current_hour] += 1
            date_iterator += timedelta(minutes=1)
    return accumulator_weekday_hour, accumulator_weekday_minutes, accumulator_weekday, accumulator_hour, accumulator_day_of_year, time_serie_year_week_based, correlation

def plot_weekday_statistics_quarter_based(accumulators, employees):
    day_vector = []
    quarter_vector = []
    value_vector = []
    name_vector = []
    for id in accumulators:
        for day in range(7):
            quarter_index = 0
            for quarter_minute_index in range(0, 24*60, 15):
                day_vector.append(day)
                sum = 0
                for minute in range(15):
                    sum += accumulators[id][day][quarter_minute_index + minute]
                name_vector.append(employees[id]['name'])
                quarter_vector.append(quarter_index)
                value_vector.append(sum/60)
                quarter_index+=1

    d = {'day': day_vector, 'quarter': quarter_vector, 'val':value_vector, 'name':name_vector}
    df = pd.DataFrame(data=d)
    g = sns.relplot(data=df, x="quarter", y="val", col="day", hue="name", kind="line", linewidth=2)

    titles = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    for ax, title in zip(g.axes.flat, titles):
        ax.set_ylim(0, max(value_vector))
        ax.set_title(title)
        ax.set_ylabel('Time logged (hours per quarter hour)', fontsize=16)
        ax.set_xlabel('')
    plt.xlim(0,((24*60)/15) - 1)
    tick_freq = 2
    xticks = range(0, 24*4, 4*tick_freq)
    xlabels = []
    for tick in xticks:
        hour = int(tick/4)
        if hour < 10:
            label = f"0{hour}:00"
        else:
            label = f"{hour}:00"
        xlabels.append(label)
    g.set(xticks=xticks)
    g.set_xticklabels(xlabels, rotation=45)
    plt.subplots_adjust(wspace=0)

def plot_weekday_statistics_full_day_based(accumulators, employees, axis):
    
    day_vector = []
    value_vector = []
    name_vector = []
    for id in accumulators:
        for day in range(7):
            day_vector.append(day)
            sum = 0
            for minute in range(24*60):
                sum += accumulators[id][day][minute]
            name_vector.append(employees[id]['name'])
            value_vector.append(sum/60)

    d = {'day': day_vector, 'val':value_vector, 'name':name_vector}
    df = pd.DataFrame(data=d)
    g = sns.barplot(ax=axis, data=df, x="day", y="val", hue='name')
    #plt.xlim(0,6)
    g.set_xticklabels(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], fontsize=12)
    plt.xlabel('', fontsize=1)
    plt.ylabel('Time logged (hours per day)', fontsize=18)

def plot_hour_statistics(accumulators, employees, axis):
    import matplotlib.pyplot as plt
    import numpy as np
    import pandas as pd
    import seaborn as sns
    hour_vector = []
    value_vector = []
    name_vector = []
    for id in accumulators:
        for hour in range(24):
            sum = 0
            for day in range(7):
                for minute in range(hour*60, (hour+1)*60):
                    sum += accumulators[id][day][minute]
            hour_vector.append(get_time_interval_from_hour_index(hour))
            name_vector.append(employees[id]['name'])
            value_vector.append(sum/60)

    d = {'hour': hour_vector, 'val':value_vector, 'name':name_vector}
    df = pd.DataFrame(data=d)
    g = sns.barplot(ax=axis, data=df, x="hour", y="val", hue='name')
    #plt.xlim(0,6)
    x_labels = [get_time_interval_from_hour_index(hour) for hour in range(24)]
    g.set_xticklabels(x_labels, fontsize=8, rotation=45, ha='right')
    plt.xlabel('', fontsize=1)
    plt.ylabel('Time logged (hours per hour)', fontsize=18)

def plot_time_series(time_series, employees):
    week_vector = []
    duration_vector = []
    name_vector = []
    year_vector = []
    min_year = 9999
    for id in time_series:
        for year in time_series[id]:
            min_year = min(min_year, year)
            for week in time_series[id][year]:
                week_vector.append(52 * (year - min_year) + week)
                duration_vector.append(time_series[id][year][week] / (60*60))
                name_vector.append(employees[id]['name'])
                year_vector.append(year)
    d = {'week': week_vector, 'duration':duration_vector, 'name':name_vector}
    df = pd.DataFrame(data=d)
    sns.lineplot(data=df, x='week', y='duration', hue='name', style='name', markers=True, dashes=True, linewidth=4)
    x_ticks_vector = sorted(list(set(week_vector)))
    years = [min(year_vector or [year]) + (week // 52) for week in x_ticks_vector]
    plt.xticks(x_ticks_vector, [f"Week {week % 52} - {get_month_string_from_week_index(week % 52)} ({year})" for week, year in zip(x_ticks_vector, years)], fontsize=10, rotation=30, ha='right')
    plt.ylabel('Time logged (hours per week)', fontsize=18)
    plt.xlabel('', fontsize=1)

def plot_correlation_heatmap(correlations, employees):
    d = {}
    for employee_id in correlations:
        d[employees[employee_id]['name']] = [value/60 for value in correlations[employee_id].values()]
    df = pd.DataFrame(data=d)
    df = df.transpose()
    ax = sns.heatmap(data=df,annot=True, fmt=".1f", linewidth=.5, cbar=False)
    ax.set(xlabel="", ylabel="")
    ticks = [employees[id]['name'] for id in correlations]
    ax.set_xticklabels(ticks, fontsize=8, rotation=0,ha='center')
    ax.set_yticklabels(ticks, fontsize=8, rotation=0)
    ax.xaxis.tick_top()
    

def prepare_graphs(accumulators, time_series, correlations, employees):
    
    plot_weekday_statistics_quarter_based(accumulators, employees)
    figure = plt.gcf() # get current figure
    figure.set_size_inches(25, 6)
    figure.suptitle("Cumulative weekday activity", fontsize=16)
    plt.subplots_adjust(left=0.04)
    plt.subplots_adjust(top=0.9)
    plt.savefig('fig1.jpg', dpi=150)
    plt.cla()
    plt.clf()
    ax2 = plt.subplot2grid((1, 2), (0, 0), colspan=1)
    ax3 = plt.subplot2grid((1, 2), (0, 1), colspan=1)
    plot_weekday_statistics_full_day_based(accumulators, employees, ax2)
    plot_hour_statistics(accumulators, employees, ax3)
    ax2.set_title('Daily activity', fontsize=16)
    ax2.set_ylabel('Time logged (hours per day)', fontsize=16)
    ax2.set_xlabel('')
    ax3.set_title('Hourly activity', fontsize=16)
    ax3.set_ylabel('Time logged (hours per hour)',fontsize=16)
    ax3.set_xlabel('')
    plt.subplots_adjust(wspace=0.1)
    figure = plt.gcf() # get current figure
    figure.set_size_inches(25, 6)
    plt.subplots_adjust(left=0.04)
    plt.savefig('fig2.jpg', dpi=150)
    plt.clf()
    plt.cla()
    im1 = Image.open('fig1.jpg')
    im2 = Image.open('fig2.jpg')
    get_concat_v(im1, im2).save('combined.jpg')
    plot_time_series(time_series, employees)
    figure = plt.gcf() # get current figure
    figure.set_size_inches(25, 6)
    figure.suptitle("Weekly activity time series", fontsize=16)

    plt.subplots_adjust(bottom=0.22)
    plt.savefig('fig3.jpg', dpi=150)
    im1 = Image.open('combined.jpg')
    im2 = Image.open('fig3.jpg')
    get_concat_v(im1, im2).save('combined.jpg')
    
    plt.clf()
    plt.cla()
    if len(correlations.keys()) > 1:
        plot_correlation_heatmap(correlations, employees)
        figure = plt.gcf() # get current figure
        figure.suptitle("Time spent with colleagues (hours)", fontsize=16)
        figure.set_size_inches(25, 6)
        plt.savefig('fig5.jpg', dpi=150)
        im1 = Image.open('combined.jpg')
        im2 = Image.open('fig5.jpg')
        get_concat_v(im1, im2).save('combined.jpg')