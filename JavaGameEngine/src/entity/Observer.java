package entity;

import java.awt.Graphics2D;

import handlers.Handler;
import handlers.Id;
import main.MainFrame;
import tile.SlopeTile;
import tile.SolidTile;

public class Observer extends Entity {

	public Observer(int x, int y, int width, int height, Id id, Handler handler, MainFrame mainFrame) {
		super(x, y, width, height, id, handler, mainFrame);
	}

	@Override
	public void render(Graphics2D g2d, double scale) {
		// TODO Auto-generated method stub
	}

	public void update() {

	}

	@Override
	public void update(int[][] colMatrix, SolidTile[][] solidTileMatrix, SlopeTile[][] partialSolidTileMatrix) {
		// TODO Auto-generated method stub

	}

}
