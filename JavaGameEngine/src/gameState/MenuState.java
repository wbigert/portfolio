package gameState;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Point;
import java.awt.image.BufferedImage;

import main.MainFrame;

public class MenuState extends GameState {

	private Font titleFont;
	private Menu menu;
	private BufferedImage background;
	private Image menuShade;

	public MenuState(GameStateManager gsm, MainFrame mainFrame) {
		super(gsm, mainFrame);
		init();
	}

	@Override
	public void init() {
		background = mediaLoader.getImage("mainMenuBackground");
		menuShade = mediaLoader.getImage("menuShade");
		menu = new Menu(new Font("Courier", Font.PLAIN, 40), new Point((mainFrame.getFrameWidth() / 2) - 150, 165), 30,
				Color.white, Color.white, new Point(300, 70), "MAINMENU", 5, 0.7f, mainFrame, gsm, this);
		menu.pause();
	}

	@Override
	public void update() {
		menu.handleInput("MAINMENU");
		handleInput();
	}

	@Override
	public void render(Graphics g) {
		g.setColor(Color.gray);
		g.fillRect(0, 0, mainFrame.getFrameWidth(), mainFrame.getFrameHeight());
		g.drawImage(background, 0, 0, mainFrame.getFrameWidth(), mainFrame.getFrameHeight(), null);

		g.setColor(Color.white);
		g.setFont(titleFont);

//		// draw title

		// draw menu options
		menu.render(g);
	}

	public void drawVaryingGraphics(Graphics g) {
	}

	@Override
	public void handleInput() {
	}
}