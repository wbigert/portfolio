package tile;

import java.awt.Polygon;
import java.awt.image.BufferedImage;

import handlers.Handler;
import handlers.Id;

public class CosmeticTile extends Tile {

	public CosmeticTile(int x, int y, int width, int height, Id id, BufferedImage tile, Polygon polygon,
			Handler handler) {
		super(x, y, width, height, id, tile, polygon, handler);
	}
}
