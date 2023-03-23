
package main;

import javax.swing.JFrame;

public class GameWindow extends JFrame {

	public GameWindow(Game canvas) {
		add(canvas);
		pack();
		setResizable(false);
		setLocationRelativeTo(null);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setVisible(true);
	}
}
