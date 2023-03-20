
package input;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyInput implements KeyListener {

	private KeyStates keyStates;

	public KeyInput() {
		this.keyStates = new KeyStates();
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void keyPressed(KeyEvent e) {
		keyStates.keySet(e.getExtendedKeyCode(), true);
	}

	public void keyReleased(KeyEvent e) {
		keyStates.keySet(e.getExtendedKeyCode(), false);
	}

	public KeyStates getKeyStates() {
		return keyStates;
	}

}
