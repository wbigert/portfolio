package handlers;

import java.awt.MouseInfo;
import java.awt.Point;
import java.awt.Rectangle;

import javax.swing.SwingUtilities;

import entity.Entity;
import entity.Player;
import main.MainFrame;

public class Camera {

	private int x, y = 0;
	private MainFrame mainFrame;
	private double zoom = 1;
	private Rectangle deadZone;
	private double moveSpeedX;
	private double moveSpeedY;
	private int levelWidth;
	private int levelHeight;
	private boolean resetX = false;
	private boolean resetY = false;
	private int deadZoneWidth;
	private int deadZoneHeight;
	private boolean followEntityHard;

	public Camera(MainFrame mainFrame) {
		this.mainFrame = mainFrame;
		moveSpeedX = 0.065;
		moveSpeedY = 0.03;
	}

	public void update(Entity entity) {
//		if (focusPointEnabled) {
//			x += toMoveX();
//			y += toMoveX()
//		}

		updateDeadZone(entity);
		if (followEntityHard) {
			resetDeadZone(entity);
		}
		x += toMoveX(entity);
		y += toMoveY(entity);
	}

	public void updateDeadZone(Entity entity) {
		if (entity.getX() < deadZone.x) {
			deadZone.setBounds(entity.getX(), deadZone.y, deadZone.width, deadZone.height);
		} else if (entity.getX() > deadZone.x + deadZone.width) {
			deadZone.setBounds(entity.getX() - deadZone.width, deadZone.y, deadZone.width, deadZone.height);
		}

		if (entity.getY() < deadZone.y) {
			deadZone.setBounds(deadZone.x, entity.getY(), deadZone.width, deadZone.height);
		} else if (entity.getY() > deadZone.y + deadZone.height) {
			deadZone.setBounds(deadZone.x, entity.getY() - deadZone.height, deadZone.width, deadZone.height);
		}
	}

	public void resetDeadZone(Entity entity, int width, int height) {
		deadZone = new Rectangle(entity.getX() - (width / 2), entity.getY() - height / 2, width, height);
		deadZoneWidth = width;
		deadZoneHeight = height;
	}

	public void resetDeadZone(Entity entity) {
		deadZone = new Rectangle(entity.getX() - (deadZoneWidth / 2), entity.getY() - deadZoneHeight / 2, deadZoneWidth,
				deadZoneHeight);
	}

	private int toMoveX(Entity entity) {
		int toReach = getDeadZoneCamX();
		int distance = Math.abs(x - getDeadZoneCamX());
		boolean increment = getDeadZoneCamX() - x > 0;

		if (resetX) {
			if (increment) {
				resetX = false;
				return distance;
			} else {
				resetX = false;
				return -distance;
			}
		}

		if (distance * moveSpeedX < 1 || !doesNotStepOverX(distance * moveSpeedX, toReach, increment)) {
			for (double d = moveSpeedX; d < 1; d += 0.005) {
				if (distance * d < 1 || !doesNotStepOverX(distance * d, toReach, increment)) {
					continue;
				} else {
					if (increment) {
						return (int) (distance * d);
					} else {
						return (int) -(distance * d);
					}
				}
			}
			if (doesNotStepOverX(1.0, toReach, increment)) {
				if (increment) {
					return 1;
				} else {
					return -1;
				}
			}
			return 0;
		}
		if (increment) {
			return (int) (distance * moveSpeedX);
		} else {
			return (int) -(distance * moveSpeedX);
		}
	}

	private int toMoveY(Entity entity) {
		int toReach = getDeadZoneCamY();
		int distance = Math.abs(y - getDeadZoneCamY());
		boolean increment = getDeadZoneCamY() - y > 0;

		if (resetY) {
			if (increment) {
				resetY = false;
				return distance;
			} else {
				resetY = false;
				return -distance;
			}
		}

		if (distance * moveSpeedY < 1 || !doesNotStepOverY(distance * moveSpeedY, toReach, increment)) {
			for (double d = moveSpeedY; d < 1; d += 0.005) {
				if (distance * d < 1 || !doesNotStepOverY(distance * d, toReach, increment)) {
					continue;
				} else {
					if (increment) {
						return (int) (distance * d);
					} else {
						return (int) -(distance * d);
					}
				}
			}
			if (doesNotStepOverX(1.0, toReach, increment)) {
				if (increment) {
					return 1;
				} else {
					return -1;
				}
			}
			return 0;
		}
		if (increment) {
			return (int) (distance * moveSpeedY);
		} else {
			return (int) -(distance * moveSpeedY);
		}
	}

	private boolean doesNotStepOverX(double val, int toReach, boolean increment) {
		if (increment) {
			if (x + val > toReach) {
				return false;
			} else {
				return true;
			}
		} else {
			if (x - val < toReach) {
				return false;
			} else {
				return true;
			}
		}
	}

	private boolean doesNotStepOverY(double val, int toReach, boolean increment) {
		if (increment) {
			if (y + val > toReach) {
				return false;
			} else {
				return true;
			}
		} else {
			if (y - val < toReach) {
				return false;
			} else {
				return true;
			}
		}
	}

	public void reset(Entity player) {
		resetX = true;
		resetY = true;
	}

	public int getX() {
		return x;
	}

	public int getDeadZoneCamX() {
		return (int) (zoom * deadZone.getCenterX() - mainFrame.getFrameWidth() / 2);
	}

	public int getDeadZoneCamY() {
		return (int) (zoom * deadZone.getCenterY() - mainFrame.getFrameHeight() / 2);
	}

	public void updateLevelBoundaries(Handler handler) {
		levelWidth = handler.getLevelTileWidth() * 64;
		levelHeight = handler.getLevelTileHeight() * 64;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;

	}

	public void setY(int y) {
		this.y = y;
	}

	public double getZoom() {
		return zoom;
	}

	public void setZoom(double zoom) {
		this.zoom = zoom;
	}

	public Point findPlayerDeadZoneDivergence(Player player) {
		int xDif = (int) -(((deadZone.getX() + deadZone.getWidth() / 2) - (player.getX() + (player.getWidth() / 2) - 1))
				* zoom);
		int yDif = (int) -(((deadZone.getY() + deadZone.getHeight() / 2) - (player.getY() + 15)) * zoom);
		return new Point(xDif, yDif);
	}

	public double findRelativeCursorAngle(Player player) {
		Point p = findRelativeCursorDif(player);
		double x = p.getX();
		double y = p.getY();

		if (x > 0 && y < 0) {
			return Math.atan(Math.abs(p.getY()) / Math.abs(p.getX()));
		} else if (x < 0 && y < 0) {
			return Math.atan(Math.abs(p.getX()) / Math.abs(p.getY())) + Math.PI * 0.5;
		} else if (x < 0 && y > 0) {
			return Math.atan(Math.abs(p.getY()) / Math.abs(p.getX())) + Math.PI;
		} else if (x > 0 && y > 0) {
			return Math.atan(Math.abs(p.getX()) / Math.abs(p.getY())) + Math.PI * 1.5;
		} else if (x == 0 && y == 0) {
			return 0;
		} else if (x == 0) {
			if (y > 0) {
				return Math.PI * 1.5;
			} else {
				return Math.PI / 2;
			}
		} else if (y == 0) {
			if (x > 0) {
				return 0;
			} else {
				return Math.PI;
			}
		}
		return 0;
	}

	public Point findRelativeCursorDif(Player player) {
		Point p = MouseInfo.getPointerInfo().getLocation();
		SwingUtilities.convertPointFromScreen(p, mainFrame.getCanvas());
		Point pD = findPlayerDeadZoneDivergence(player);

		int X = (int) (p.getX() - pD.getX());
		int Y = (int) (p.getY() - pD.getY());
		int xDif = 0;
		int yDif = 0;
		if (X < mainFrame.getFrameWidth() / 2) {
			xDif = (int) -((mainFrame.getFrameWidth() / 2) - X);
		} else {
			xDif = (int) (X - (mainFrame.getFrameWidth() / 2));
		}

		if (Y < mainFrame.getFrameHeight() / 2) {
			yDif = (int) -((mainFrame.getFrameHeight() / 2) - Y);
		} else {
			yDif = (int) (Y - (mainFrame.getFrameHeight() / 2));
		}
		return new Point(xDif, yDif);
	}

	public void toggleFollowEntity(Entity entity) {
		followEntityHard = !followEntityHard;
	}

	public Rectangle getDeadZone() {
		return deadZone;
	}

}
