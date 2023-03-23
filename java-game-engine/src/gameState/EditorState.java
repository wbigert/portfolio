package gameState;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import entity.Observer;
import main.MainFrame;

public class EditorState extends GameState {

	private Observer observer;
	private EditorIterator iterator;
	private Font font1;
	private int keyHeldIndex;
	private int panSpeed = 30;
	private Menu menu;
	private boolean paused;

	public EditorState(GameStateManager gsm, MainFrame mainFrame) {
		super(gsm, mainFrame);
		init();
	}

	@Override
	public void init() {
		iterator = new EditorIterator(mediaLoader);
		font1 = new Font("Courier", Font.PLAIN, 10);

		menu = new Menu(new Font("Courier", Font.PLAIN, 40), new Point((mainFrame.getFrameWidth() / 2) - 150, 80), 30,
				Color.white, Color.white, new Point(300, 70), "EDITOR", 5, 0.8f, mainFrame, gsm, this);

		paused = false;
		gsm.clearLevel();
		gsm.createLevel(iterator.getCurrentLevelString());
		observer = handler.getObserver();
		camera.setZoom(1);
		camera.updateLevelBoundaries(handler);
		camera.resetDeadZone(observer, 0, 0);

	}

	@Override
	public void update() {
		if (menu.isPaused()) {
			menu.handleInput("EDITOR");
		} else {
			handleInput();
			camera.update(observer);
		}
	}

	public void render(Graphics g) {
		g.setColor(Color.gray);
		g.fillRect(0, 0, handler.getLevelTileWidth() * 64, handler.getLevelTileHeight() * 64);
		g.translate(-camera.getX(), -camera.getY());
		drawVaryingGraphics(g);
		g.translate(camera.getX(), camera.getY());
		drawStaticGraphics(g, mainFrame);

		menu.render(g);

		Toolkit.getDefaultToolkit().sync();
	}

	private void drawStaticGraphics(Graphics g, MainFrame mainFrame) {
		g.drawImage(iterator.getCurrentTexture(), mainFrame.getFrameWidth() - 200, 150, 64, 64, null);
		g.setColor(Color.white);
		g.drawRect(mainFrame.getFrameWidth() - 200, 150, 64, 64);
		g.setFont(font1);
		g.setColor(Color.white);
		g.drawString("Current Texture: " + iterator.getCurrentTextureString(), mainFrame.getFrameWidth() - 215, 230);
		g.drawString("Current Layer: " + iterator.getCurrentLayerIndex(), mainFrame.getFrameWidth() - 215, 250);
		g.drawString("Current Level: " + iterator.getCurrentLevelString(), mainFrame.getFrameWidth() - 215, 270);
	}

	private void drawVaryingGraphics(Graphics g) {
		gsm.getHandler().render(g, camera.getZoom());
		g.setColor(Color.red);
		g.drawRect(observer.getX(), observer.getY(), 64, 64);
	}

	public void handleInput() {
		if (menu.isPaused()) {
			menu.handleInput("EDITOR");
		} else {
			keyReleaseCheck(observer);
			keyPressCheck(observer);
		}
	}

	private void keyPressCheck(Observer observer) {
		if (keyStates.isPressed("F")) {
			System.exit(0);
		} else if (keyStates.isPressed("ESCAPE")) {
			menu.pause();
		} else if (keyStates.isPressed("W")) {
			observer.setY(observer.getY() - 64);
			keyHeldIndex = 1;
		} else if (keyStates.isHeld("W")) {
			if (keyHeldIndex % panSpeed == 0) {
				keyHeldIndex = 1;
				observer.setY(observer.getY() - 64);
			} else {
				keyHeldIndex++;
			}
		} else if (keyStates.isPressed("A")) {
			observer.setX(observer.getX() - 64);
			keyHeldIndex = 1;
		} else if (keyStates.isHeld("A")) {
			if (keyHeldIndex % panSpeed == 0) {
				keyHeldIndex = 1;
				observer.setX(observer.getX() - 64);
			} else {
				keyHeldIndex++;
			}
		} else if (keyStates.isPressed("S")) {
			observer.setY(observer.getY() + 64);
			keyHeldIndex = 1;
		} else if (keyStates.isHeld("S")) {
			if (keyHeldIndex % panSpeed == 0) {
				keyHeldIndex = 1;
				observer.setY(observer.getY() + 64);
			} else {
				keyHeldIndex++;
			}
		} else if (keyStates.isPressed("D")) {
			observer.setX(observer.getX() + 64);
			keyHeldIndex = 1;
		} else if (keyStates.isHeld("D")) {
			if (keyHeldIndex % panSpeed == 0) {
				keyHeldIndex = 1;
				observer.setX(observer.getX() + 64);
			} else {
				keyHeldIndex++;
			}
		}
		if (keyStates.isPressed("Q")) {
			iterator.incrementTexture();
		} else if (keyStates.isPressed("E")) {
			iterator.decrementTexture();
		} else if (keyStates.isPressed("K")) {
			iterator.incrementLayer();
		} else if (keyStates.isPressed("J")) {
			iterator.decrementLayer();
		} else if (keyStates.isPressed("ENTER")) {
			iterator.getCurrentLayer().setRGB(observer.getX() / 64, observer.getY() / 64, iterator.getCurrentRGB());
			handler.clearLevel();
			handler.createLevel(iterator.getCurrentLevelString());
		} else if (keyStates.isPressed("DELETE")) {
			iterator.getCurrentLayer().setRGB(observer.getX() / 64, observer.getY() / 64,
					(new Color(255, 255, 255)).getRGB());
			handler.clearLevel();
			handler.createLevel(iterator.getCurrentLevelString());
		}
	}

	private void keyReleaseCheck(Observer observer) {

	}

	public void saveCurrentLevel() {
		try {
			ImageIO.write(iterator.getCurrentLevel()[0], "png", new File("./res/levels/"
					+ iterator.getCurrentLevelString() + "/" + iterator.getCurrentLevelString() + "Layer1.png"));

			ImageIO.write(iterator.getCurrentLevel()[1], "png", new File("./res/levels/"
					+ iterator.getCurrentLevelString() + "/" + iterator.getCurrentLevelString() + "Layer2.png"));

			ImageIO.write(iterator.getCurrentLevel()[2], "png", new File("./res/levels/"
					+ iterator.getCurrentLevelString() + "/" + iterator.getCurrentLevelString() + "Layer3.png"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}