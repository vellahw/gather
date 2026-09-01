package com.our.gather.common.utils;

import java.awt.image.BufferedImage;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.our.gather.common.dao.CommonDao;

@Component("fileUtils")
public class FileUtils {

	private static final long MAX_FILE_SIZE = 10L * 1024L * 1024L;
	private static final long MAX_PIXELS = 40_000_000L;

	@Resource(name = "CommonDao")
	private CommonDao commonDao;

	@Value("${app.upload.dir}")
	private String uploadDirectory;

	public List<Map<String, Object>> fileInsert(Map<String, Object> map, HttpServletRequest request,
			HttpSession session) throws Exception {
		List<Map<String, Object>> result = new ArrayList<>();
		if (!(request instanceof MultipartHttpServletRequest)) {
			return result;
		}

		Path root = Paths.get(uploadDirectory).toAbsolutePath().normalize();
		List<Path> createdFiles = new ArrayList<>();
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			Iterator<String> names = multipartRequest.getFileNames();
			while (names.hasNext()) {
				MultipartFile file = multipartRequest.getFile(names.next());
				if (file == null || file.isEmpty()) {
					continue;
				}
				if (file.getSize() > MAX_FILE_SIZE) {
					throw new IllegalArgumentException("Image exceeds 10MB");
				}
				BufferedImage image = readValidatedImage(file);

				String fileId = String.valueOf(map.get("FILE_IDXX"));
				String folder = folderFor(fileId);
				Path directory = root.resolve(folder).resolve(fileId).normalize();
				if (!directory.startsWith(root)) {
					throw new SecurityException("Invalid upload path");
				}
				Files.createDirectories(directory);
				String storedName = CommonUtils.getRandomString() + ".png";
				Path destination = directory.resolve(storedName);
				if (!ImageIO.write(image, "png", destination.toFile())) {
					throw new IllegalArgumentException("Unsupported image");
				}
				createdFiles.add(destination);

				Map<String, Object> fileMap = new HashMap<>();
				fileMap.put("FILE_IDXX", fileId);
				fileMap.put("FILE_SEQC", "wallPaper".equals(file.getName()) ? "XXX" : null);
				fileMap.put("USER_NUMB", fileId.startsWith("UR") ? fileId : session.getAttribute("USER_NUMB"));
				fileMap.put("FILE_PATH", "/uploads/" + folder + "/" + fileId + "/" + storedName);
				fileMap.put("FILE_OGNM", safeOriginalName(file.getOriginalFilename()));
				fileMap.put("FILE_SVNM", storedName);
				fileMap.put("FILE_SIZE", Files.size(destination));
				fileMap.put("MAIN_YSNO", "mainImage".equals(file.getName()) ? "Y" : "N");
				result.add(fileMap);
			}

			for (Map<String, Object> fileMap : result) {
				commonDao.comFileInsert(fileMap);
			}
			return result;
		} catch (Exception e) {
			for (Path path : createdFiles) {
				Files.deleteIfExists(path);
			}
			throw e;
		}
	}

	private String folderFor(String fileId) {
		if (fileId == null || fileId.length() < 2) {
			throw new IllegalArgumentException("Invalid file owner");
		}
		switch (fileId.substring(0, 2)) {
		case "UR": return "profile";
		case "GT": return "gather";
		case "CB": return "club";
		case "CH": return "challenge";
		default: throw new IllegalArgumentException("Unsupported file owner");
		}
	}

	private BufferedImage readValidatedImage(MultipartFile file) throws Exception {
		try (InputStream input = file.getInputStream();
				ImageInputStream imageInput = ImageIO.createImageInputStream(input)) {
			if (imageInput == null) {
				throw new IllegalArgumentException("Invalid image");
			}
			Iterator<ImageReader> readers = ImageIO.getImageReaders(imageInput);
			if (!readers.hasNext()) {
				throw new IllegalArgumentException("Unsupported image");
			}
			ImageReader reader = readers.next();
			try {
				reader.setInput(imageInput, true, true);
				int width = reader.getWidth(0);
				int height = reader.getHeight(0);
				if (width <= 0 || height <= 0 || (long) width * height > MAX_PIXELS) {
					throw new IllegalArgumentException("Invalid or oversized image");
				}
				return reader.read(0);
			} finally {
				reader.dispose();
			}
		}
	}

	private String safeOriginalName(String originalName) {
		if (originalName == null) {
			return "image";
		}
		String name = Paths.get(originalName).getFileName().toString();
		name = name.replaceAll("[\\p{Cntrl}<>\"']", "_");
		return name.length() > 255 ? name.substring(name.length() - 255) : name;
	}
}
