<template>
  <div class="main-qr-scan">
    <h1>Coloca el código QR dentro del recuadro</h1>   
    <div class="qr-scan" ref="qrScan"></div>
  </div>
</template>

<script>
export default {
  name: 'ScanQRView',
  mounted() {
    this.setupQRScanner();
  },
  methods: {
    async setupQRScanner() {
      const video = document.createElement('video');
      const qrScanDiv = this.$refs.qrScan;
      qrScanDiv.appendChild(video);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        video.play();

      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
      }
    }
  }
}
</script>

<style scoped>
@import url('../styles.css');

.main-qr-scan {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 12px;
}

.main-qr-scan h1 {
  color: var(--title-color);
  font-family: var(--primary-font);
  font-size: var(--title-size);
}

.qr-scan {
  width: 350px;
  height: 350px;
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
  overflow: hidden;
}
</style>
