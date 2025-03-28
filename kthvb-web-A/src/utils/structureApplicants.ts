export function validateSourceData(sourceData: any) {
    // List of keys to be validated (single key path)
    const keysSingle = [
        "id",
        "Name (First and Last)",
        "Email Address",
        "Timestamp",
        "Are you currently a student at KTH? If you are a student at another university, please specify which one. If you are not currently studying, please briefly describe your current occupation. Note: As a student association within THS, we are required to maintain a majority (50%) of our members as active KTH students and members of THS. However, everyone is welcome to try out, and we encourage participation from a diverse range of students and community members.",
        "How long do you plan to study at KTH (or the university you previously mentioned)? This helps us understand your potential availability for the team in the coming semesters. We encourage participation regardless of your study duration, but this information is helpful for planning team continuity.",
        "Are you a member of THS? Note: To meet the requirements, at least 50% of our players need to be members in Tekniska Högskolans Studentkår. However, everyone is encouraged to try out, regardless of membership status.",
        "[Libero]",
        "[Setter]",
        "[Right Side Hitter]",
        "[Middle Blocker]",
        "[Outside Hitter]",
        "Description of Korpen League: Korpen is a Swedish amateur league that offers a fun and competitive environment for volleyball enthusiasts of all skill levels. It’s a great opportunity to play regularly, improve your game, and be part of a team without the pressure of division-level play. Games are held on Sunday evenings in Stockholm, providing a perfect way to stay active and enjoy the sport in a relaxed, social setting. Are you interested in playing as a regular for the Korpen team? Korpen offers a fun and competitive volleyball experience with 16 matches on Sunday evenings (18:00-21:00) in Stockholm. It’s a great way to improve your skills, stay active, and enjoy the game in a relaxed setting.",
        "We value participants who can attend all of our practices. Please indicate how often you expect to be able to attend the following practice sessions: Tuesdays: 20:00 - 22:00, Wednesdays: 21:00 - 22:30, Thursdays: 19:30 - 21:30.",
        "Is there any additional information you would like to share? Why do you believe you would be a great addition to the team?",
        "What are your expectations for your time with the team?",
        "Which times are you available? You can choose more than one option.",
        "How did you find out about us?",
        "Previous Experience",
        "Are you interested in taking on a board position for the next academic year? Board members have specific responsibilities, such as PR, IT, Events, or Captain roles.",
        "Which team are you applying for? Please specify whether you are applying for the men's or women's team.",
        "paid_deposit",
        "deposit_returned",
        "picture",
        "comments",
        "tryouts_shirt_number",
    ];
  
    // List of groups of possible keys (if any of the keys in the list exists, it's valid)
    const keysMultiple = [
        [
            "There will be a 100 kr deposit to secure your spot for the tryouts",
            "There will be a 75 SEK fee to secure your spot for the tryouts",
        ],
    ];
  
    // Helper function to check for the existence of nested keys
    function checkNested(obj: any, path: string[]) {
        return path.reduce((xs, x) => (xs && xs[x] !== undefined) ? xs[x] : null, obj) !== null;
    }
  
    let valid = true;
  
    // Check each single key
    for (let key of keysSingle) {
        const keyPath = key.split('.').map(k => k.trim());
        if (!checkNested(sourceData, keyPath)) {
            // console.log("Missing key:", key);
            valid = false;
        }
    }
  
    // Check each group of multiple keys
    for (let keyList of keysMultiple) {
        let passed = false;
        for (let key of keyList) {
            const keyPath = key.split('.').map(k => k.trim());
            if (checkNested(sourceData, keyPath)) {
                passed = true;
                break;
            }
        }
        if (!passed) {
            // console.log("Missing one of keys:", keyList);
            valid = false;
        }
    }
  
    // Return false if any validation failed, true if all keys are present
    return valid;
  }
  


  export function structureApplicantData(sourceData: any) {
    validateSourceData(sourceData);

    let depositInfo = "";
    if (sourceData["There will be a 100 kr deposit to secure your spot for the tryouts"]) {
        depositInfo =
            sourceData[
                "There will be a 100 kr deposit to secure your spot for the tryouts"
            ]?.[
                " You will get your deposit back when you show up for the tryout"
            ]?.[
                " If you are swishing from another name, please write down your own name in the message"
            ]?.[""] || "";
    } else {
        depositInfo =
            sourceData[
                "There will be a 75 SEK fee to secure your spot for the tryouts"
            ]?.[
                " If you are making the payment from an account under a different name, please include your own name in the payment message and Tryouts HT24"
            ]?.[""] || "";
    }

    // Create an object for the preferred roles dynamically since it has new keys and might not exist
    const preferredRoles = {
        libero: sourceData['Preferred Role to play [Libero]'] || '',
        setter: sourceData['Preferred Role to play [Setter]'] || '',
        opposite: sourceData['Preferred Role to play [Opposite/Right/Off-Spiker]'] || '',
        middle: sourceData['Preferred Role to play [Middle]'] || '',
        wingSpiker: sourceData['Preferred Role to play [Outside/Left/Wing Spiker]'] || '',
    };

    // Handle nested fields with empty keys like "" to extract values
    const extractNestedValue = (field: any) => field?.[""] || "";

    // Extract values from the nested structure
    const nationality = extractNestedValue(sourceData[
        "What is your nationality?\n\nIf you identify with multiple nationalities; write both, where you’re from and also by which nationalities you identify as"
    ]) || '';

    const regularForKorpen = extractNestedValue(sourceData[
        "I want to be a regular for the Korpen team and I'm available for most/all games (Sunday evenings 18-21, in Stockholm, a total of 16 matches across the term)"
    ]) || '';

    const teamAppliedFor = extractNestedValue(sourceData[
        "Which team are you applying for? Note that volleyball leagues have strict gender rules"
    ]) || '';

    const studyAtKTH = extractNestedValue(sourceData[
        "Do you study at KTH?\n\n*If you're a student at another university, please specify which one.\n**If you're not studying, briefly inform what you do"
    ]) || '';

    const studyDuration = sourceData[
        "For how long are you going to study at KTH (or other university stated before)? "
    ] || '';

    const THSMember = sourceData[
        "Are you a THS member? (We need at least 50% of the players to be THS members)"
    ] || '';

    const participationFrequency = extractNestedValue(sourceData[
        "We value people who are able to come to all of our practices"
    ]) || '';

    // Handle the new structure, including optional questions and defaults
    return {
        id: sourceData["id"] || "",  // Handle missing ID
        name: sourceData["Name (First and Last)"] || "",  // Handle missing name
        email: sourceData["Email Address"] || "",  // Handle missing email
        time: sourceData["Timestamp"] || "",  // Handle missing timestamp
        comments: sourceData["comments"] || "",  // Fallback for comments
        nationality,  // Extracted nationality
        studyAtKTH,  // Extracted studyAtKTH
        studyDuration,  // Extracted studyDuration
        THSMember,  // Extracted THSMember
        preferredRoles,
        regularForKorpen,  // Extracted regularForKorpen
        participationFrequency,  // Extracted participationFrequency
        additionalInfo: sourceData["Any additional information that you would like to add? Why should we pick you?"] || "",
        depositInfo,
        teamExpectations:
            sourceData["What are your expectations for your time at the team?"] || "",
        availability:
            sourceData[
                "Which times are you available? You can choose more than one option."
            ]?.[""] || "",  // Default to empty string
        source: sourceData["How did you find out about us?"] || "",
        previousExperience: sourceData["Previous Experience"] || "",
        boardPositionInterest:
            extractNestedValue(sourceData[
                "Are you interested in taking a board* position for the coming year?"
            ]) || "",  // Default to empty string
        availableTimes:
            extractNestedValue(sourceData[
                "Which times are you available? You can choose more than one option."
            ]) || "",  // Default to empty string
        teamAppliedFor,  // Extracted teamAppliedFor
        paid_deposit: sourceData["paid_deposit"] || "",  // Default to empty string
        deposit_returned: sourceData["deposit_returned"] || "",  // Default to empty string
        picture: sourceData["picture"] || "",  // Default to empty string
        tryouts_shirt_number: sourceData["tryouts_shirt_number"] || "",  // Default to empty string
    };
}


  
