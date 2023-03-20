package tile;

import java.awt.Point;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import handlers.Handler;
import handlers.Id;

public class SlopeTile extends Tile {

	public SlopeTile(int x, int y, int width, int height, Id id, BufferedImage tile, Polygon polygon, Handler handler) {
		super(x, y, width, height, id, tile, polygon, handler);
	}

	public boolean intersects(Rectangle bounds) {
		if (!getBounds().intersects(bounds)) {
			return false;
		}

		Rectangle rec = getBounds().intersection(bounds);
		// bottom right corner of intersecting rectangle
		Point p;
		if (id == Id.RIGHTTRIANGLE) {
			p = new Point((int) (rec.getX() + rec.getWidth() - 1), (int) (rec.getY() + rec.getHeight() - 1));
		} else {
			p = new Point((int) (rec.getX()), (int) (rec.getY() + rec.getHeight() - 1));
		}

		if (p.getX() + 1 - this.x < 0 || p.getX() + 1 - this.x > width) {
			return false;
		} else {
			if (p.getY() - slope((int) p.getX()) < 0) {
				return false;
			} else {
				return true;
			}
		}

	}

	public int slope(int x) {
		if (id == Id.RIGHTTRIANGLE) {
			return this.y + 64 - (int) ((x + 1 - this.x) * ((double) height / (double) width));
		} else {
			return this.y + 64 - (int) ((63 - (x - this.x)) * ((double) height / (double) width));
		}
	}

	public int findSlopePos(Rectangle bounds) {
		if (id == Id.RIGHTTRIANGLE) {
			Rectangle rec = getBounds().intersection(bounds);
			int x = (int) (rec.getX() + rec.getWidth() - 1);
			return slope(x) - (int) bounds.getHeight();
		} else {
			Rectangle rec = getBounds().intersection(bounds);
			int x = (int) rec.getX();
			return slope(x) - (int) bounds.getHeight();
		}
	}

}
