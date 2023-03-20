package tile;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import handlers.Handler;
import handlers.Id;

public abstract class Tile {

	protected final BufferedImage tile;
	protected final Handler handler;
	protected final int x, y, width, height;
	protected int velX, velY;
	protected Id id;
	protected Polygon polygon;

	public Tile(int x, int y, int width, int height, Id id, BufferedImage tile, Polygon polygon, Handler handler) {

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.id = id;
		this.tile = tile;
		this.polygon = polygon;
		this.handler = handler;
	}

	public void render(Graphics2D g2d, double scale) {
		if (id == Id.ATTACHEDCOFFINRIGHT) {
			g2d.drawImage(tile, (int) ((x - 32) * scale), (int) (y * scale), (int) (96 * scale), (int) (32 * scale),
					null);
		} else {
			g2d.drawImage(tile, (int) (x * scale), (int) (y * scale), (int) (width * scale), (int) (height * scale),
					null);
		}
//		debug
		if (id == Id.RIGHTTRIANGLE || id == id.LEFTTRIANGLE) {
			g2d.setColor(new Color(255, 0, 255));
			g2d.fillPolygon(polygon);
		}
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public int getTileMatPosY() {
		return y / 64;
	}

	public int getTileMatPosX() {
		return x / 64;
	}

	public Polygon getPolygon() {
		return polygon;
	}

	public Rectangle getBounds() {
		return new Rectangle(x, y, width, height);
	}

	public Rectangle getBoundsTop() {
		return new Rectangle(x + 10, y, width - 20, 5);
	}

	public Rectangle getBoundsBot() {
		return new Rectangle(x + 10, y + height - 5, width - 20, 5);
	}

	public Rectangle getBoundsLeft() {
		return new Rectangle(x, y + 10, 5, height - 20);
	}

	public Rectangle getBoundsRight() {
		return new Rectangle(x + width - 5, y + 10, 5, height - 20);
	}

	public Id getId() {
		return id;
	}
}
