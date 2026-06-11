export interface Source {
  id: string;
  name: string;
  url: string;
  description: string;
  color: string;
  icon: string;
  mangaUrl: string;
}

export const SOURCES: Source[] = [
  {
    id: "mangadex",
    name: "MangaDex",
    url: "https://mangadex.org",
    description: "Nguồn dữ liệu truyện tranh chính, chất lượng cao",
    color: "#FF6740",
    icon: "M",
    mangaUrl: "https://mangadex.org",
  },
  {
    id: "nettruyen",
    name: "NetTruyen",
    url: "https://nettruyen.gg/trang-chu",
    description: "Kho truyện tranh phong phú, cập nhật nhanh",
    color: "#E74C3C",
    icon: "N",
    mangaUrl: "https://nettruyen.gg",
  },
  {
    id: "truyenqq",
    name: "TruyenQQ",
    url: "https://truyenqqko.com/",
    description: "Đa dạng thể loại truyện, giao diện thân thiện",
    color: "#3498DB",
    icon: "Q",
    mangaUrl: "https://truyenqqko.com",
  },
];

export const SOURCE_COOKIE_KEY = "truyendex-source";
export const INSTALLED_SOURCES_COOKIE_KEY = "truyendex-installed";
