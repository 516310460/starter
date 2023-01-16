<script lang="tsx" setup>
// 为什么不全部使用tsx文件呢。因为静态节点提升。性能无解。
import { noticeListApi } from '~~/api/home'

const bitgetStore = useBitgetStore()
let noticeListData = ref({
  list: [],
  more: {
    id: 0,
    title: '',
    url: '',
  },
})

noticeListApi().then((res) => {
  noticeListData.value = res
})

// Component could be a simple function with JSX syntax
const Welcome = () => <span>Welcome </span>

// Or using defineComponent setup that returns render function with JSX syntax
const Nuxt3 = defineComponent(() => {
  return () => <span>nuxt3</span>
})

// We can combine components with JSX syntax too
const InlineComponent = () => (
  <div>
    <Welcome />
    <span>to </span>
    <Nuxt3 />
  </div>
)

const setCount = () => {
  bitgetStore.count++
  bitgetStore.setCount(bitgetStore.count)
}

const setSaveCount = () => {
  bitgetStore.saveCount++
  bitgetStore.setSaveCount(bitgetStore.saveCount)
}
</script>

<template>
  <div
    class="h-[calc(100%-80px)] overflow-y-auto box-border"
    p="10"
  >
    <InlineComponent />
    <!-- Defined in components/jsx-component.ts -->
    <MyComponent message="This is an external JSX component" />
    <button
      class="btn"
      @click="setCount()"
    >{{bitgetStore.count}}- 记录状态</button>
    <button
      class="btn"
      @click="setSaveCount()"
    >{{bitgetStore.saveCount}}- 记录状态(存储)</button>
    <h1>请求数据</h1>
    <div class="banner-notice flex items-center justify-center">
      <div
        class="flex items-center"
        v-for="(item, index) in noticeListData.list"
        :key="index"
      >
        <span class="text-T4 mr-2 font-medium">[{{ item.created_desc }}]</span>
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="notice"
        >
          <span class="title">{{ item.title }}</span>
        </a>
        <img
          class="line"
          src="/img/line.png"
          alt
        />
      </div>

      <a
        :href="noticeListData.more ? noticeListData.more.url : ''"
        target="_blank"
        class="notice-more flex items-center"
      >
        {{ noticeListData.more ? noticeListData.more.title : '' }}
        <img
          src="/img/arr-r.png"
          alt
        />
      </a>
    </div>
  </div>
</template>
