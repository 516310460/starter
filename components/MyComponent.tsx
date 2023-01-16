export default defineComponent({
  props: {
    message: String
  },
  render: (props: { message: any }) => {
    return (
    <div>
      { props.message }
    </div>
    )
  }
})
