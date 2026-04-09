<script setup>
</script>

<template>
  <div class="placeholder-page">
    <div class="container">
      <div class="content">
        <h1>页面开发中...</h1>
        <p>此页面正在开发中，敬请期待</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.placeholder-page {
  min-height: calc(100vh - 64px - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;

  h1 {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
  }

  p {
    color: var(--color-text-secondary);
  }
}
</style>
