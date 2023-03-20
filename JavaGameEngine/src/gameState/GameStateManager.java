package gameState;

import java.awt.Graphics;

import audio.AudioPlayer;
import handlers.Handler;
import handlers.MediaLoader;
import main.MainFrame;

public class GameStateManager {

	private GameState[] gameStates;
	private MainFrame mainFrame;
	private int currentState;
	private boolean paused;
	private Handler handler;

	private final int NUMGAMESTATES = 4;
	private final int MAINMENU_STATE = 0;
	private final int PLAYING_STATE = 1;
	private final int PAUSE_STATE = 2;
	private final int EDITOR_STATE = 3;
	private int coins = 0;
	private MediaLoader mediaLoader;
	private AudioPlayer audioPlayer;

	public GameStateManager(MainFrame mainFrame) {
		this.mainFrame = mainFrame;
		audioPlayer = mainFrame.getAudioPlayer();
		mediaLoader = mainFrame.getMediaLoader();
		handler = new Handler(mainFrame, this);
		gameStates = new GameState[NUMGAMESTATES];
		paused = false;
		currentState = MAINMENU_STATE;
		loadState(currentState);

	}

	private void loadState(int state) {
		if (state == MAINMENU_STATE) {
			mediaLoader.load(state, audioPlayer);
			gameStates[state] = new MenuState(this, mainFrame);
		} else if (state == PLAYING_STATE) {
			mediaLoader.load(state, audioPlayer);
			gameStates[state] = new PlayingState(this, mainFrame);
		} else if (state == EDITOR_STATE) {
			mediaLoader.load(state, audioPlayer);
			gameStates[state] = new EditorState(this, mainFrame);
		}
//		} else if (state == PAUSE_STATE) {
//			gameStates[state] = new PauseState(this);
//		}
	}

	private void unloadState(int state) {
		gameStates[state] = null;
	}

	public void setState(int state) {
		unloadState(currentState);
		currentState = state;
		loadState(currentState);
	}

	public void setPaused(boolean b) {
		paused = b;
	}

	public void update() {
		if (gameStates[currentState] != null) {
			gameStates[currentState].update();
		}
	}

	public void render(Graphics g, MainFrame mainFrame) {
		if (gameStates[currentState] != null)
			gameStates[currentState].render(g);
		else {
			g.setColor(java.awt.Color.BLACK);
			g.fillRect(0, 0, mainFrame.getFrameWidth(), mainFrame.getFrameHeight());
		}
	}

	public Handler getHandler() {
		return handler;
	}

	public void createLevel(String s) {
		handler.createLevel(s);
	}

	public MediaLoader getMediaLoader() {
		return mediaLoader;
	}

	public GameState[] getGameStates() {
		return gameStates;
	}

	public int getCoins() {
		return coins;
	}

	public void setCoins(int coins) {
		this.coins = coins;
	}

	public AudioPlayer getAudioPlayer() {
		return audioPlayer;
	}

	public void clearLevel() {
		handler.clearLevel();
	}
}