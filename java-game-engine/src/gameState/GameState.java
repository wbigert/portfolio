package gameState;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.HashMap;

import audio.AudioPlayer;
import handlers.Camera;
import handlers.Handler;
import handlers.MediaLoader;
import input.KeyStates;
import input.MouseWheelStates;
import main.MainFrame;

public abstract class GameState {

	protected MainFrame mainFrame;
	protected GameStateManager gsm;
	protected HashMap<String, BufferedImage> textures;
	protected Camera camera;
	protected KeyStates keyStates;
	protected MouseWheelStates mouseWheelStates;
	protected Handler handler;
	protected AudioPlayer audioPlayer;
	protected MediaLoader mediaLoader;

	public GameState(GameStateManager gsm, MainFrame mainFrame) {
		this.mainFrame = mainFrame;
		this.gsm = gsm;
		this.mediaLoader = gsm.getMediaLoader();
		this.textures = mediaLoader.getTextures();
		this.camera = mainFrame.getCamera();
		this.keyStates = mainFrame.getKeyStates();
		this.mouseWheelStates = mainFrame.getMouseWheelStates();
		this.handler = gsm.getHandler();
		this.audioPlayer = mainFrame.getAudioPlayer();
	}

	public abstract void init();

	public abstract void update();

	public abstract void render(Graphics g);

	public abstract void handleInput();

}
