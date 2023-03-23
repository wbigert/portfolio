package gameState;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.font.GlyphVector;
import java.awt.image.BufferedImage;
import java.util.ArrayList;

import audio.AudioPlayer;
import handlers.MediaLoader;
import input.KeyStates;
import main.MainFrame;

public class Menu {

	private Color selectColor;
	private Color optionsColor;
	private int currentChoice = 0;
	private int menuDepth = 0; // 0 menu, 1 settings, 2 volume, 3 FPS
	private int spacing;
	private Point start;
	private Font font;
	private BufferedImage menuButton;
	private Point buttonDimensions;
	private BufferedImage menuShade;
	private float shadeOpacity;
	private int volumeMax;

	private ArrayList<String>[] options;
	private MediaLoader mediaLoader;
	private GameStateManager gsm;
	private KeyStates keyStates;
	private AudioPlayer audioPlayer;
	private MainFrame mainFrame;
	private boolean active;
	private GameState gs;

	public Menu(Font font, Point start, int spacing, Color optionsColor, Color selectColor, Point buttonDimensions,
			String type, int volumeMax, float shadeOpacity, MainFrame mainFrame, GameStateManager gsm, GameState gs) {
		this.font = font;
		this.start = start;
		this.spacing = spacing;
		this.optionsColor = optionsColor;
		this.selectColor = selectColor;
		this.gsm = gsm;
		this.mainFrame = mainFrame;
		this.keyStates = mainFrame.getKeyStates();
		this.audioPlayer = mainFrame.getAudioPlayer();
		this.mediaLoader = mainFrame.getMediaLoader();
		this.options = mediaLoader.getOptions(type);
		this.buttonDimensions = buttonDimensions;
		this.menuButton = mediaLoader.getImage("menuButton");
		this.volumeMax = volumeMax;
		this.menuShade = mediaLoader.getImage("menuShade");
		this.active = false;
		this.shadeOpacity = shadeOpacity;
		this.gs = gs;
	}

	public void render(Graphics g) {
		if (active) {
			Graphics2D g2d = (Graphics2D) g.create();
			g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, shadeOpacity));
			g2d.drawImage(menuShade, 0, 0, mainFrame.getFrameWidth(), mainFrame.getFrameHeight(), null);
			g2d.dispose();

			// draw menu options
			g.setFont(font);
			g.setColor(optionsColor);
			ArrayList<String> currentOptions = options[menuDepth];

			for (int i = 0; i < currentOptions.size(); i++) {
				Rectangle rect = new Rectangle((int) start.getX(),
						(int) start.getY() + i * (spacing + (int) buttonDimensions.getY()),
						(int) buttonDimensions.getX(), (int) buttonDimensions.getY());

				g.drawImage(menuButton, (int) rect.getX(), (int) rect.getY(), (int) rect.getWidth(),
						(int) rect.getHeight(), null);

				drawCenteredString(g, currentOptions.get(i), rect, font, i == currentChoice);
			}

			// draw volume boxes
			if (menuDepth == 2) {
				for (int i = 0; i < volumeMax; i++) {
					g.drawRect((int) (start.getX() + buttonDimensions.getX() - 120 + 20 * i),
							(int) (start.getY() + spacing + buttonDimensions.getY() * 1.5 - 10), 15, 26);
				}
				for (int i = 0; i < audioPlayer.getVolumeLevel(); i++) {
					g.fillRect((int) (start.getX() + buttonDimensions.getX() - 120 + 20 * i),
							(int) (start.getY() + spacing + buttonDimensions.getY() * 1.5 - 10), 15, 26);
				}
			}
		}
	}

	public void drawCenteredString(Graphics g, String text, Rectangle rect, Font font, Boolean drawOutline) {
		// Get the FontMetrics
		FontMetrics metrics = g.getFontMetrics(font);
		// Determine the X coordinate for the text
		int x = rect.x + (rect.width - metrics.stringWidth(text)) / 2;
		// Determine the Y coordinate for the text (note we add the ascent, as in java
		// 2d 0 is top of the screen)
		int y = rect.y + ((rect.height - metrics.getHeight()) / 2) + metrics.getAscent();
		// Set the font
		g.setFont(font);
		// Draw the String

		Color outlineColor = Color.yellow;
		Color fillColor = Color.white;
		BasicStroke outlineStroke = new BasicStroke(1.5f);

		Graphics2D g2 = (Graphics2D) g.create();
		g2.translate(x, y);

		// create a glyph vector from your text
		GlyphVector glyphVector = font.createGlyphVector(g2.getFontRenderContext(), text);
		// get the shape object
		Shape textShape = glyphVector.getOutline();

		// activate anti aliasing for text rendering (if you want it to look nice)
		g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

		if (drawOutline) {
			g2.setColor(outlineColor);
			g2.setStroke(outlineStroke);
			g2.draw(textShape);
		}

		g2.setColor(fillColor);
		g2.fill(textShape); // fill the shape
		g2.dispose();

	}

	public int getDepth() {
		return menuDepth;
	}

	public int getCurrentChoice() {
		return currentChoice;
	}

	public void reset() {
		currentChoice = 0;
		menuDepth = 0;
	}

	public void incrementChoice() {
		if (currentChoice < options[menuDepth].size() - 1) {
			currentChoice++;
		} else {
			currentChoice = 0;
		}
	}

	public void decrementChoice() {
		if (currentChoice > 0) {
			currentChoice--;
		} else {
			currentChoice = options[menuDepth].size() - 1;
		}
	}

	public void setDepth(int depth) {
		menuDepth = depth;
		currentChoice = 0;
	}

	public void mainMenuBack() {
		switch (menuDepth) {
		case 1:
			setDepth(0);
			break;
		case 2:
			setDepth(1);
			break;
		case 3:
			setDepth(1);
			break;

		}
	}

	public void editorMenuBack() {
		switch (menuDepth) {
		case 1:
			setDepth(0);
			break;
		case 2:
			setDepth(1);
			break;
		case 3:
			setDepth(1);
			break;
		}
	}

	public void playingMenuBack() {
		switch (menuDepth) {
		case 1:
			setDepth(0);
			break;
		case 2:
			setDepth(1);
			break;
		case 3:
			setDepth(1);
			break;

		}
	}

	public void handleInput(String string) {
		if (active) {
			if (string.equals("MAINMENU")) {
				mainMenuInput();
			} else if (string.equals("EDITOR")) {
				editorMenuInput();
			} else if (string.contentEquals("PLAYING")) {
				playingMenuInput();
			}
		}
	}

	private void mainMenuInput() {
		if (keyStates.isPressed("ENTER")) {
			mainMenuSelect();
		} else if (keyStates.isPressed("ESCAPE")) {
			mainMenuBack();
			audioPlayer.play("menuSelect");
		} else if (menuDepth == 2 && currentChoice == 1) {
			int volumeLevel = audioPlayer.getVolumeLevel();
			if (keyStates.isPressed("D") || keyStates.isPressed("RIGHT")) {
				if (volumeLevel < volumeMax) {
					audioPlayer.setVolumeLevel(volumeLevel + 1);
					audioPlayer.setVolume((volumeLevel + 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");

				}
			} else if (keyStates.isPressed("A") || keyStates.isPressed("LEFT")) {
				if (volumeLevel > 0) {
					audioPlayer.setVolumeLevel(volumeLevel - 1);
					audioPlayer.setVolume((volumeLevel - 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");
				}
			}
		}

		if (keyStates.isPressed("UP") || keyStates.isPressed("W")) {
			decrementChoice();
			audioPlayer.play("menuChange");
		} else if (keyStates.isPressed("DOWN") || keyStates.isPressed("S")) {
			incrementChoice();
			audioPlayer.play("menuChange");
		}
	}

	private void mainMenuSelect() {
		switch (menuDepth) {
		case 0: // menu
			switch (currentChoice) {
			case 0:
				reset();
				audioPlayer.play("menuSelect");
				audioPlayer.stop("menuMusic");
				gsm.setState(1);
				break;
			case 1:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				audioPlayer.play("menuSelect");
				audioPlayer.stop("menuMusic");
				gsm.setState(3);
				break;
			case 3:
				audioPlayer.play("menuSelect");
				System.exit(0);
				break;
			}
			break;
		case 1: // settings
			switch (currentChoice) {
			case 0:
				setDepth(0);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				setDepth(2);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				setDepth(3);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		case 2: // volume
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				break; // change volume with arrow keys or A/D keys
			}
			break;
		case 3: // FPS
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				mainFrame.setTargetFPS(30);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				mainFrame.setTargetFPS(60);
				audioPlayer.play("menuSelect");
				break;
			case 3:
				mainFrame.setTargetFPS(144);
				audioPlayer.play("menuSelect");
				break;
			case 4:
				mainFrame.setTargetFPS(5000);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		}
	}

	private void editorMenuInput() {
		if (keyStates.isPressed("ENTER")) {
			editorMenuSelect();
		} else if (keyStates.isPressed("ESCAPE")) {
			editorMenuBack();
			audioPlayer.play("menuSelect");
		} else if (menuDepth == 2 && currentChoice == 1) {
			int volumeLevel = audioPlayer.getVolumeLevel();
			if (keyStates.isPressed("D") || keyStates.isPressed("RIGHT")) {
				if (volumeLevel < volumeMax) {
					audioPlayer.setVolumeLevel(volumeLevel + 1);
					audioPlayer.setVolume((volumeLevel + 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");

				}
			} else if (keyStates.isPressed("A") || keyStates.isPressed("LEFT")) {
				if (volumeLevel > 0) {
					audioPlayer.setVolumeLevel(volumeLevel - 1);
					audioPlayer.setVolume((volumeLevel - 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");
				}
			}
		}

		if (keyStates.isPressed("UP") || keyStates.isPressed("W")) {
			decrementChoice();
			audioPlayer.play("menuChange");
		} else if (keyStates.isPressed("DOWN") || keyStates.isPressed("S")) {
			incrementChoice();
			audioPlayer.play("menuChange");
		}
	}

	private void editorMenuSelect() {
		switch (menuDepth) {
		case 0:
			switch (currentChoice) {
			case 0:
				resume();
				reset();
				audioPlayer.play("menuSelect");
				break;
			case 1:
				// Save
				audioPlayer.play("menuSelect");
				EditorState es = (EditorState) gs;
				es.saveCurrentLevel();
				break;
			case 2:
				setDepth(1);
				audioPlayer.play("menuSelect");
				audioPlayer.stop("menuMusic");
				break;
			case 3:
				reset();
				audioPlayer.play("menuSelect");
				mediaLoader.initializeLevels();
				gsm.setState(0);
				break;
			case 4:
				audioPlayer.play("menuSelect");
				System.exit(0);
				break;
			}
			break;
		case 1: // settings
			switch (currentChoice) {
			case 0:
				setDepth(0);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				setDepth(2);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				setDepth(3);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		case 2: // volume
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				break; // change volume with arrow keys or A/D keys
			}
			break;
		case 3: // FPS
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				mainFrame.setTargetFPS(30);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				mainFrame.setTargetFPS(60);
				audioPlayer.play("menuSelect");
				break;
			case 3:
				mainFrame.setTargetFPS(144);
				audioPlayer.play("menuSelect");
				break;
			case 4:
				mainFrame.setTargetFPS(5000);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		}
	}

	private void playingMenuInput() {
		if (keyStates.isPressed("ENTER")) {
			playingMenuSelect();
		} else if (keyStates.isPressed("ESCAPE")) {
			playingMenuBack();
			audioPlayer.play("menuSelect");
		} else if (menuDepth == 2 && currentChoice == 1) {
			int volumeLevel = audioPlayer.getVolumeLevel();
			if (keyStates.isPressed("D") || keyStates.isPressed("RIGHT")) {
				if (volumeLevel < volumeMax) {
					audioPlayer.setVolumeLevel(volumeLevel + 1);
					audioPlayer.setVolume((volumeLevel + 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");

				}
			} else if (keyStates.isPressed("A") || keyStates.isPressed("LEFT")) {
				if (volumeLevel > 0) {
					audioPlayer.setVolumeLevel(volumeLevel - 1);
					audioPlayer.setVolume((volumeLevel - 1) * 0.1f);
					audioPlayer.resetLoop("menuMusic");
					audioPlayer.play("menuSelect");
				}
			}
		}

		if (keyStates.isPressed("UP") || keyStates.isPressed("W")) {
			decrementChoice();
			audioPlayer.play("menuChange");
		} else if (keyStates.isPressed("DOWN") || keyStates.isPressed("S")) {
			incrementChoice();
			audioPlayer.play("menuChange");
		}
	}

	private void playingMenuSelect() {
		switch (menuDepth) {
		case 0:
			switch (currentChoice) {
			case 0:
				resume();
				reset();
				audioPlayer.play("menuSelect");
				break;
			case 1:
				// Restart
				audioPlayer.play("menuSelect");
				PlayingState ps = (PlayingState) gs;
				reset();
				resume();
				ps.restart();
				break;
			case 2:
				setDepth(1);
				audioPlayer.play("menuSelect");
				audioPlayer.stop("menuMusic");
				break;
			case 3:
				reset();
				audioPlayer.play("menuSelect");
				gsm.setState(0);
				break;
			case 4:
				audioPlayer.play("menuSelect");
				System.exit(0);
				break;
			}
			break;
		case 1: // settings
			switch (currentChoice) {
			case 0:
				setDepth(0);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				setDepth(2);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				setDepth(3);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		case 2: // volume
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				break; // change volume with arrow keys or A/D keys
			}
			break;
		case 3: // FPS
			switch (currentChoice) {
			case 0:
				setDepth(1);
				audioPlayer.play("menuSelect");
				break;
			case 1:
				mainFrame.setTargetFPS(30);
				audioPlayer.play("menuSelect");
				break;
			case 2:
				mainFrame.setTargetFPS(60);
				audioPlayer.play("menuSelect");
				break;
			case 3:
				mainFrame.setTargetFPS(144);
				audioPlayer.play("menuSelect");
				break;
			case 4:
				mainFrame.setTargetFPS(5000);
				audioPlayer.play("menuSelect");
				break;
			}
			break;
		}
	}

	public void pause() {
		active = true;
	}

	public void resume() {
		active = false;
	}

	public boolean isPaused() {
		return active;
	}
}
