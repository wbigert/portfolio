package sprite;

import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

public class SpriteSheet {

	private BufferedImage sheet = null;
	private int spriteSize;

	public SpriteSheet(String path, int spriteSize) {
		this.spriteSize = spriteSize;
		try {
			sheet = ImageIO.read(new File(path));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public BufferedImage getSprite(int x, int y) {
		return sheet.getSubimage(x * spriteSize - spriteSize, y * spriteSize - spriteSize, spriteSize, spriteSize);
	}
}
