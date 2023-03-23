
package main;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;

public class Game extends Canvas {

	public Game() {
		Dimension dim = new Dimension(1440, 810);
		setPreferredSize(dim);
		setMinimumSize(dim);
		setMaximumSize(dim);
		setBackground(Color.BLACK);
	}
	
	public static void main(String[] args) {
		System.setProperty("sun.java2d.opengl", "true"); //ENABLE IF USING LAPTOP
		Game game = new Game();
		GameWindow frame = new GameWindow(game);
		MainFrame loop = new MainFrame(game);
	}
}
