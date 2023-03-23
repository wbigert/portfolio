package input;

import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;

public class MouseWheelInput implements MouseWheelListener {

	private MouseWheelStates mouseWheelStates;

	public MouseWheelInput() {
		this.mouseWheelStates = new MouseWheelStates();
	}

	@Override
	public void mouseWheelMoved(MouseWheelEvent e) {
		int notches = e.getWheelRotation();
		if (notches < 0) {
			mouseWheelStates.keySet("UP", true);
		} else {
			mouseWheelStates.keySet("DOWN", true);
		}

	}

	public MouseWheelStates getMouseWheelStates() {
		return mouseWheelStates;
	}

}
