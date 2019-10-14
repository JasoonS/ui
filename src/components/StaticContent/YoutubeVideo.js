import React from "react"

const styles = {
  vidContainer: {
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
  },
  video: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  }
}
export default () =>
  <div style={styles.vidContainer}>
    <iframe
      style={styles.video}
      src="https://www.youtube.com/embed/63qtVVmcpmU"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen></iframe>
  </div>
