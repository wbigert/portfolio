
package tile;

import java.awt.Point;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import handlers.Handler;
import handlers.Id;

public class SolidTile extends Tile {

	protected SolidTile[][] st;
	protected SlopeTile[][] slt;
	protected int[][] col;

	public SolidTile(int x, int y, int width, int height, Id id, BufferedImage tile, Polygon polygon, Handler handler) {
		super(x, y, width, height, id, tile, polygon, handler);
	}

	public boolean intersects(Rectangle rec) {
		return getBounds().intersects(rec);
	}

	public Point findEvasion(Rectangle rectangle) {
		Rectangle rec = getIntersection(rectangle);

		if (rec.getHeight() > rec.getWidth()) {
			if (rec.getCenterX() > getBounds().getCenterX()) {
				if (bordersRight()) {
					if (rec.getCenterY() > getBounds().getCenterY()) {
						return new Point(0, (int) rec.getHeight());
					} else {
						return new Point(0, (int) -rec.getHeight());
					}
				} else {
					return new Point((int) rec.getWidth(), 0);
				}
			} else {
				if (bordersLeft()) {
					if (rec.getCenterY() > getBounds().getCenterY()) {
						return new Point(0, (int) rec.getHeight());
					} else {
						return new Point(0, (int) -rec.getHeight());
					}
				} else {
					return new Point((int) -rec.getWidth(), 0);
				}
			}
		} else {
			if (rec.getCenterY() > getBounds().getCenterY()) {
				if (bordersBot()) {
					if (rec.getCenterX() > getBounds().getCenterX()) {
						return new Point((int) rec.getWidth(), 0);
					} else {
						return new Point((int) -rec.getWidth(), 0);
					}
				} else {
					if (handler.getPlayer().getVelY() > 0) {
						return new Point(0, 0);
					} else {
						return new Point(0, (int) rec.getHeight());
					}
				}
			} else {
				if (bordersTop()) {
					if (rec.getCenterX() > getBounds().getCenterX()) {
						return new Point((int) rec.getWidth(), 0);
					} else {
						return new Point((int) -rec.getWidth(), 0);
					}
				} else {
					if (handler.getPlayer().getVelY() < 0) {
						return new Point(0, 0);
					} else {
						return new Point(0, (int) -rec.getHeight());
					}
				}
			}
		}
	}

	public Rectangle getIntersection(Rectangle rec) {
		return getBounds().intersection(rec);
	}

	public boolean bordersTop() {
		int[][] col = handler.getTileCollisionMatrix();
		if (getTileMatPosY() - 1 < 0) {
			return false;
		} else {
			return col[getTileMatPosY() - 1][getTileMatPosX()] == 1;
		}
	}

	public boolean bordersBot() {
		int[][] col = handler.getTileCollisionMatrix();
		if (getTileMatPosY() + 1 > handler.getLevelTileHeight() - 1) {
			return false;
		} else {
			return col[getTileMatPosY() + 1][getTileMatPosX()] == 1;
		}
	}

	public boolean bordersLeft() {
		int[][] col = handler.getTileCollisionMatrix();
		if (getTileMatPosX() - 1 < 0) {
			return false;
		} else {
			return col[getTileMatPosY()][getTileMatPosX() - 1] == 1;
		}
	}

	public boolean bordersRight() {
		int[][] col = handler.getTileCollisionMatrix();
		if (getTileMatPosX() + 1 > handler.getLevelTileWidth() - 1) {
			return false;
		} else {
			return col[getTileMatPosY()][getTileMatPosX() + 1] == 1;
		}
	}
}
