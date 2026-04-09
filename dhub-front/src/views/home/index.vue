<script setup>
import { ref } from 'vue'

const currentSlide = ref(0)

const slides = [
  {
    image: 'https://source.unsplash.com/1600x900/?cosplay',
    title: '漫展服务一站式预约',
    desc: '假发、服装、妆面专业服务，轻松准备你的 COS 造型'
  },
  {
    image: 'https://source.unsplash.com/1600x900/?anime',
    title: '找到你的漫展搭子',
    desc: '组队功能让你不再孤单，一起逛展一起嗨'
  },
  {
    image: 'https://source.unsplash.com/1600x900/?festival',
    title: '热门漫展推荐',
    desc: '汇集全国各地 ACG 漫展信息，不错过任何精彩'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}
</script>

<template>
  <div class="home-page">
    <!-- Banner 轮播 -->
    <section class="banner-section">
      <div class="banner-carousel">
        <div
          class="slide"
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ 'is-active': currentSlide === index }"
        >
          <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
          <div class="slide-content">
            <div class="container">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.desc }}</p>
              <el-button type="primary" size="large">立即体验</el-button>
            </div>
          </div>
        </div>
        <button class="carousel-btn prev" @click="prevSlide">
          <el-icon><ArrowLeft /></el-icon>
        </button>
        <button class="carousel-btn next" @click="nextSlide">
          <el-icon><ArrowRight /></el-icon>
        </button>
        <div class="carousel-dots">
          <span
            v-for="(_, index) in slides"
            :key="index"
            :class="{ 'is-active': currentSlide === index }"
            @click="currentSlide = index"
          ></span>
        </div>
      </div>
    </section>

    <!-- 服务入口 -->
    <section class="service-section">
      <div class="container">
        <h2 class="section-title">热门服务</h2>
        <div class="service-cards">
          <router-link to="/service/wigs" class="service-card">
            <div class="card-icon">
              <el-icon><Scissor /></el-icon>
            </div>
            <h3>假发预约</h3>
            <p>专业 COS 假发定制，多种款式可选</p>
          </router-link>
          <router-link to="/service/cosplay" class="service-card">
            <div class="card-icon">
              <el-icon><Goods /></el-icon>
            </div>
            <h3>服装预约</h3>
            <p>精品 COS 服装定制，精细做工</p>
          </router-link>
          <router-link to="/service/makeup" class="service-card">
            <div class="card-icon">
              <el-icon><Brush /></el-icon>
            </div>
            <h3>妆面预约</h3>
            <p>专业化妆师，完美还原角色</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 组队入口 -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门组队</h2>
          <router-link to="/team" class="more-link">
            查看更多
            <el-icon><ArrowRight /></el-icon>
          </router-link>
        </div>
        <div class="team-cards">
          <router-link to="/team" class="team-card">
            <div class="team-info">
              <h4>上海 CP30 逛展搭子</h4>
              <p class="team-desc">寻找同样喜欢漫威的小姐姐，一起逛展拍照</p>
              <div class="team-meta">
                <span><el-icon><Location /></el-icon> 上海</span>
                <span><el-icon><Calendar /></el-icon> 10月</span>
              </div>
            </div>
            <div class="team-members">
              <el-avatar :size="28">A</el-avatar>
              <el-avatar :size="28">B</el-avatar>
              <el-avatar :size="28" class="more-avatar">+3</el-avatar>
            </div>
          </router-link>
          <router-link to="/team" class="team-card">
            <div class="team-info">
              <h4>广州萤火虫漫展拼房</h4>
              <p class="team-desc">找女生一起拼酒店房间，分担费用</p>
              <div class="team-meta">
                <span><el-icon><Location /></el-icon> 广州</span>
                <span><el-icon><Calendar /></el-icon> 11月</span>
              </div>
            </div>
            <div class="team-members">
              <el-avatar :size="28">C</el-avatar>
              <el-avatar :size="28">D</el-avatar>
              <el-avatar :size="28" class="more-avatar">+2</el-avatar>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  background: var(--color-bg-page);
}

/* Banner 轮播 */
.banner-section {
  margin-bottom: var(--spacing-2xl);
}

.banner-carousel {
  position: relative;
  height: 450px;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity var(--transition-slow);

  &.is-active {
    opacity: 1;
  }
}

.slide-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  }
}

.slide-content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;

  h2 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xl);
    opacity: 0.9;
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: var(--spacing-lg);
  }

  &.next {
    right: var(--spacing-lg);
  }
}

.carousel-dots {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-sm);

  span {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);

    &.is-active {
      width: 24px;
      border-radius: 4px;
      background: white;
    }
  }
}

/* 服务卡片 */
.service-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin: var(--spacing-md) 0 var(--spacing-sm);
  }

  p {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
}

.card-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-bg);
  border-radius: var(--radius-lg);
  color: var(--color-primary);
  font-size: 28px;
}

/* 组队卡片 */
.team-section {
  margin-bottom: var(--spacing-2xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.more-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-primary);
  font-size: var(--font-size-sm);

  &:hover {
    text-decoration: underline;
  }
}

.team-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.team-card {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-md);
  }
}

.team-info {
  h4 {
    font-size: var(--font-size-md);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
}

.team-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.team-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);

  span {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
}

.team-members {
  display: flex;
  align-items: center;
}

.team-members .el-avatar {
  margin-left: -8px;
  border: 2px solid var(--color-bg);

  &:first-child {
    margin-left: 0;
  }

  &.more-avatar {
    background: var(--color-bg-hover);
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
  }
}
</style>
