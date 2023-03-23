package input;

import java.util.HashMap;

public class MouseWheelStates {

	private HashMap<String, Boolean> keyState = new HashMap<>();
	private HashMap<String, Boolean> prevKeyState = new HashMap<>();

	public MouseWheelStates() {
		keyState.put("UP", false);
		keyState.put("DOWN", false);
		prevKeyState.put("UP", false);
		prevKeyState.put("DOWN", false);
	}

	public void keySet(String string, boolean b) {
		keyState.put(string, b);
	}

	public void update() {
		prevKeyState.putAll(keyState);
		keyState.put("UP", false);
		keyState.put("DOWN", false);
	}

	public boolean isPressed(String button) {
		return keyState.get(button) && !prevKeyState.get(button);
	}

	public boolean isReleased(String button) {
		return !keyState.get(button) && prevKeyState.get(button);
	}

}
