
package main;

import java.awt.Graphics;
import java.awt.Toolkit;
import java.awt.image.BufferStrategy;

import audio.AudioPlayer;
import gameState.GameStateManager;
import handlers.Camera;
import handlers.MediaLoader;
import input.KeyInput;
import input.KeyStates;
import input.MouseWheelInput;
import input.MouseWheelStates;

public class MainFrame implements Runnable {
	private Camera camera;
	private Game canvas;
	private AudioPlayer audioPlayer;
	private GameStateManager gsm;
	private Thread thread;
	private KeyInput keyInput;
	private MouseWheelInput mouseWheelInput;
	private MediaLoader mediaLoader;

	private Graphics g;
	private double targetFPS;
	private double targetFrameTimeDif;
	private boolean running = false;

	public MainFrame(Game canvas) {
		this.canvas = canvas;
		start();
	}

	private void init() {

		keyInput = new KeyInput();
		canvas.addKeyListener(keyInput);
		mouseWheelInput = new MouseWheelInput();
		canvas.addMouseWheelListener(mouseWheelInput);
		audioPlayer = new AudioPlayer();
		mediaLoader = new MediaLoader();
		camera = new Camera(this);
		gsm = new GameStateManager(this);
	}

	private synchronized void start() {
		if (running) {
			return;
		}
		running = true;
		thread = new Thread(this);
		thread.start();
	}

	private synchronized void stop() {
		if (!running) {
			return;
		}
		running = false;
		try {
			thread.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		init();
		canvas.requestFocus();
		final double targetUPS = 60.0;
		targetFPS = 144.0;

		final double targetUpdateTimeDif = 1000000000.0 / targetUPS;
		targetFrameTimeDif = 1000000000.0 / targetFPS;

		double currentUpdateTimeDif = 0.0;
		double currentFrameTimeDif = 0.0;

		long startTime = System.nanoTime();
		long timer = System.currentTimeMillis();

		int frameCounter = 0;
		int updateCounter = 0;

		while (running) {
			long currentTime = System.nanoTime();
			currentUpdateTimeDif += (currentTime - startTime);
			currentFrameTimeDif += (currentTime - startTime);
			startTime = currentTime;

			if (currentUpdateTimeDif >= targetUpdateTimeDif) {
				update();
				updateCounter++;
				currentUpdateTimeDif -= targetUpdateTimeDif;
			}

			if (currentFrameTimeDif >= targetFrameTimeDif) {
				render();
				frameCounter++;
				currentFrameTimeDif -= targetFrameTimeDif;
			}

			if (System.currentTimeMillis() - timer >= 1000) {
				System.out.println("UPS: " + updateCounter + ", FPS: " + frameCounter);
				updateCounter = 0;
				frameCounter = 0;
				timer += 1000;
			}
		}

	}

	public void render() {

		BufferStrategy bs = canvas.getBufferStrategy();
		if (bs == null) {
			canvas.createBufferStrategy(3);
			return;
		}
		g = bs.getDrawGraphics();
		gsm.render(g, this);
		Toolkit.getDefaultToolkit().sync();
		g.dispose();
		bs.show();
	}

	public int getFrameWidth() {
		return canvas.getWidth();
	}

	public int getFrameHeight() {
		return canvas.getHeight();
	}

	public void update() {
		gsm.update();
		keyInput.getKeyStates().update();
		mouseWheelInput.getMouseWheelStates().update();
	}

	public Camera getCamera() {
		return camera;
	}

	public KeyStates getKeyStates() {
		return keyInput.getKeyStates();
	}

	public MouseWheelStates getMouseWheelStates() {
		return mouseWheelInput.getMouseWheelStates();
	}

	public AudioPlayer getAudioPlayer() {
		return audioPlayer;
	}

	public Game getCanvas() {
		return canvas;
	}

	public Object getGraphics() {
		return g;
	}

	public void setTargetFPS(int fps) {
		targetFPS = fps;
		targetFrameTimeDif = 1000000000.0 / targetFPS;
	}

	public GameStateManager getGameStateManager() {
		return gsm;
	}

	public MediaLoader getMediaLoader() {
		return mediaLoader;
	}
}
