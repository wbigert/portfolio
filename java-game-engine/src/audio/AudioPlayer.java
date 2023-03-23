package audio;

import java.io.File;
import java.util.HashMap;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.FloatControl;

public class AudioPlayer {

	private HashMap<String, Clip> clips;
	private int gap;
	private boolean mute = false;
	private float volume;
	private int volumeLevel;

	public AudioPlayer() {
		clips = new HashMap<String, Clip>();
		gap = 0;
		volume = 0.1f;
	}

	public void load(String s, String n) {
		Clip clip;
		try {
			AudioInputStream ais = AudioSystem.getAudioInputStream(new File(s));
			AudioFormat baseFormat = ais.getFormat();
			AudioFormat decodeFormat = new AudioFormat(AudioFormat.Encoding.PCM_SIGNED, baseFormat.getSampleRate(), 16,
					baseFormat.getChannels(), baseFormat.getChannels() * 2, baseFormat.getSampleRate(), false);
			AudioInputStream dais = AudioSystem.getAudioInputStream(decodeFormat, ais);
			clip = AudioSystem.getClip();
			clip.open(dais);
			clips.put(n, clip);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setVolume(float volume) {
		this.volume = volume;
		if (clips.get("music1") != null) {
			setVolume(clips.get("music1"), volume);
		}
	}

	public void setVolume(Clip clip, float volume) {
		if (volume < 0f || volume > 1f) {
			throw new IllegalArgumentException("Volume not valid:" + volume);
		}
		FloatControl gainControl = (FloatControl) clip.getControl(FloatControl.Type.MASTER_GAIN);
		gainControl.setValue(20f * (float) Math.log10(volume));
	}

	public void play(String s) {
		play(s, gap);
	}

	public void clear() {
		clips.clear();
	}

	public void play(String s, int i) {
		if (mute)
			return;
		Clip c = clips.get(s);
		setVolume(c, volume);
		if (c == null)
			return;
		if (c.isRunning())
			c.stop();
		c.setFramePosition(i);
		while (!c.isRunning())
			c.start();
	}

	public void stop(String s) {
		if (clips.get(s) == null)
			return;
		if (clips.get(s).isRunning())
			clips.get(s).stop();
	}

	public void resume(String s) {
		if (mute)
			return;
		if (clips.get(s).isRunning())
			return;
		clips.get(s).start();
	}

	public void loop(String s) {
		loop(s, gap, gap, clips.get(s).getFrameLength() - 1);
	}

	public void loop(String s, int frame) {
		loop(s, frame, gap, clips.get(s).getFrameLength() - 1);
	}

	public void loop(String s, int start, int end) {
		loop(s, gap, start, end);
	}

	public void loop(String s, int frame, int start, int end) {
		stop(s);
		if (mute)
			return;
		setVolume(clips.get(s), volume);
		clips.get(s).setLoopPoints(start, end);
		clips.get(s).setFramePosition(frame);
		clips.get(s).loop(Clip.LOOP_CONTINUOUSLY);
	}

	public void setPosition(String s, int frame) {
		clips.get(s).setFramePosition(frame);
	}

	public int getFrames(String s) {
		return clips.get(s).getFrameLength();
	}

	public int getPosition(String s) {
		return clips.get(s).getFramePosition();
	}

	public Clip getClip(String s) {
		return clips.get(s);
	}

	public void reset(String s) {
		Clip clip = clips.get(s);
		System.out.println("1");
		int frame = clip.getFramePosition();
		System.out.println("2");
		play(s, frame);
		System.out.println("4");
	}

	public void resetLoop(String s) {
		Clip clip = clips.get(s);
		System.out.println("1");
		int frame = clip.getFramePosition();
		System.out.println("2");
		loop(s, frame);
		System.out.println("4");
	}

	public void close(String s) {
		stop(s);
		clips.get(s).close();
	}

	public void setVolumeLevel(int volume) {
		volumeLevel = volume;
	}

	public int getVolumeLevel() {
		return volumeLevel;
	}

}