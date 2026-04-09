<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="brand-logo">
            <span class="logo-icon">D</span>
            <span class="logo-text">Hub</span>
          </div>
          <p class="brand-desc">ACG 漫展社区，服务预约与组队社交平台</p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>平台服务</h4>
            <router-link to="/service/wigs">假发预约</router-link>
            <router-link to="/service/cosplay">服装预约</router-link>
            <router-link to="/service/makeup">妆面预约</router-link>
          </div>
          <div class="link-group">
            <h4>社区功能</h4>
            <router-link to="/team">组队大厅</router-link>
            <router-link to="/team/create">创建组队</router-link>
          </div>
          <div class="link-group">
            <h4>帮助与支持</h4>
            <a href="#">常见问题</a>
            <a href="#">联系客服</a>
            <a href="#">意见反馈</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© 2026 DHub 漫展社区. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  margin-top: auto;
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-2xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);

  .logo-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-md);
    font-size: 20px;
  }
}

.brand-desc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.link-group {
  h4 {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  a {
    display: block;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-sm);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary);
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

.copyright {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.footer-legal {
  display: flex;
  gap: var(--spacing-lg);

  a {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
