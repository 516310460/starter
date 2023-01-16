<script lang="tsx" setup>
// 为什么不全部使用tsx文件呢。因为静态节点提升。性能无解。
const bitgetStore = useBitgetStore()

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
  </div>
</template>
