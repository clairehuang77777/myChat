export const TextArea = () => {
  return (
    <>
      <textarea className="textarea mt-3 pl-3 pt-3"id="post" name="post" rows="4" cols="100" defaultValue="Type something...">
      </textarea>
      <button className="post-btn rounded-md bg-blue-500 text-black h-[50px] mt-3 ml-2" type="button">Send</button>
    </>
  )
}
