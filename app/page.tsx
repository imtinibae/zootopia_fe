"use client";

import React from "react";


const googleFontsLink = document.createElement("link");
googleFontsLink.href = "https://fonts.googleapis.com/css2?family=VT323&display=swap";
googleFontsLink.rel = "stylesheet";
document.head.appendChild(googleFontsLink);


const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    fontFamily: `"VT323", monospace`,
    background: "radial-gradient(circle, #000000, #1a1a1a, #333333)",
    color: "#00ffcc",
  },
  half: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, background 0.3s ease",
  },
  halfHover: {
    background: "linear-gradient(135deg, #00ffcc, #006666)",
    transform: "scale(1.05)",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    textShadow: "2px 2px #000",
  },
  button: {
    marginTop: "20px",
    padding: "15px 40px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    backgroundColor: "#00ffcc",
    border: "3px solid #00ffff",
    borderRadius: "10px",
    color: "#000",
    cursor: "pointer",
    transition: "transform 0.3s ease, background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#006666",
    transform: "scale(1.1)",
  },
};

export default function Page() {
  return (
    <div style={styles.container}>
      <div
        style={styles.half}
        className="character"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            styles.halfHover.background as string;
          (e.currentTarget as HTMLElement).style.transform =
            styles.halfHover.transform as string;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "none";
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        <h1 style={styles.title}>Choose Your Character</h1>
        <a href="/characters">
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.transform =
                styles.buttonHover.transform as string)
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.transform = "none")
            }
          >
            Go
          </button>
        </a>
      </div>

  
      <div
        style={styles.half}
        className="animal"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            styles.halfHover.background as string;
          (e.currentTarget as HTMLElement).style.transform =
            styles.halfHover.transform as string;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "none";
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        <h1 style={styles.title}>Choose Your Animals</h1>
        <a href="/animals">
          <button
            style={styles.button}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.transform =
                styles.buttonHover.transform as string)
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.transform = "none")
            }
          >
            Go
          </button>
        </a>
      </div>
    </div>
  );
}
