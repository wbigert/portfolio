package input;

import java.awt.event.KeyEvent;
import java.util.HashMap;

// this class contains a boolean array of current and previous key states
// for the 10 keys that are used for this game.
// a key k is down when keyState[k] is true.

public class KeyStates {

	private final int NUM_KEYS = 18;

	private HashMap<String, Boolean> keyState = new HashMap<>();
	private HashMap<String, Boolean> prevKeyState = new HashMap<>();

	public KeyStates() {
		keyState.put("W", false);
		keyState.put("A", false);
		keyState.put("S", false);
		keyState.put("D", false);
		keyState.put("Q", false);
		keyState.put("E", false);
		keyState.put("R", false);
		keyState.put("F", false);
		keyState.put("Y", false);
		keyState.put("J", false);
		keyState.put("K", false);
		keyState.put("COMMA", false);
		keyState.put("PERIOD", false);
		keyState.put("UP", false);
		keyState.put("DOWN", false);
		keyState.put("LEFT", false);
		keyState.put("RIGHT", false);
		keyState.put("SPACE", false);
		keyState.put("BUTTON1", false);
		keyState.put("BUTTON2", false);
		keyState.put("BUTTON3", false);
		keyState.put("BUTTON4", false);
		keyState.put("ENTER", false);
		keyState.put("ESCAPE", false);
		keyState.put("DELETE", false);
		prevKeyState.put("W", false);
		prevKeyState.put("A", false);
		prevKeyState.put("S", false);
		prevKeyState.put("D", false);
		prevKeyState.put("Q", false);
		prevKeyState.put("E", false);
		prevKeyState.put("R", false);
		prevKeyState.put("F", false);
		prevKeyState.put("Y", false);
		prevKeyState.put("J", false);
		prevKeyState.put("K", false);
		prevKeyState.put("COMMA", false);
		prevKeyState.put("PERIOD", false);
		prevKeyState.put("UP", false);
		prevKeyState.put("DOWN", false);
		prevKeyState.put("LEFT", false);
		prevKeyState.put("RIGHT", false);
		prevKeyState.put("SPACE", false);
		prevKeyState.put("BUTTON1", false);
		prevKeyState.put("BUTTON2", false);
		prevKeyState.put("BUTTON3", false);
		prevKeyState.put("BUTTON4", false);
		prevKeyState.put("ENTER", false);
		prevKeyState.put("ESCAPE", false);
		prevKeyState.put("DELETE", false);
	}

	// @formatter:off
	public void keySet(int i, boolean b) {
		if(i == KeyEvent.VK_W) keyState.put("W", b);
		else if(i == KeyEvent.VK_A) keyState.put("A", b);
		else if(i == KeyEvent.VK_S) keyState.put("S", b);
		else if(i == KeyEvent.VK_D) keyState.put("D", b);
		else if(i == KeyEvent.VK_Q) keyState.put("Q", b);
		else if(i == KeyEvent.VK_E) keyState.put("E", b);
		else if(i == KeyEvent.VK_R) keyState.put("R", b);
		else if(i == KeyEvent.VK_F) keyState.put("F", b);
		else if(i == KeyEvent.VK_Y) keyState.put("Y", b);
		else if(i == KeyEvent.VK_J) keyState.put("J", b);
		else if(i == KeyEvent.VK_K) keyState.put("K", b);
		else if(i == KeyEvent.VK_COMMA) keyState.put("COMMA", b);
		else if(i == KeyEvent.VK_PERIOD) keyState.put("PERIOD", b);
		else if(i == KeyEvent.VK_UP) keyState.put("UP", b);
		else if(i == KeyEvent.VK_DOWN) keyState.put("DOWN", b);
		else if(i == KeyEvent.VK_LEFT) keyState.put("LEFT", b);
		else if(i == KeyEvent.VK_RIGHT) keyState.put("RIGHT", b);
		else if(i == KeyEvent.VK_SPACE) keyState.put("SPACE", b);
		else if(i == KeyEvent.VK_1) keyState.put("BUTTON1", b);
		else if(i == KeyEvent.VK_2) keyState.put("BUTTON2", b);
		else if(i == KeyEvent.VK_3) keyState.put("BUTTON3", b);
		else if(i == KeyEvent.VK_4) keyState.put("BUTTON4", b);
		else if(i == KeyEvent.VK_ENTER) keyState.put("ENTER", b);
		else if(i == KeyEvent.VK_ESCAPE) keyState.put("ESCAPE", b);
		else if(i == KeyEvent.VK_DELETE) keyState.put("DELETE", b);
	}
	// @formatter:on

	public void update() {
		prevKeyState.putAll(keyState);
	}

	public boolean isPressed(String button) {
		return keyState.get(button) && !prevKeyState.get(button);
	}

	public boolean isHeld(String button) {
		return keyState.get(button);
	}

	public boolean isReleased(String button) {
		return !keyState.get(button) && prevKeyState.get(button);
	}
}
