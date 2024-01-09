import "@/app/home/home.css"

function HomePage() {
  return (
    <div className="grid grid-cols-3 todo-cont">
      <div className="form-cont flex flex-col justify-start items-center">
        <h2>New Task</h2>
        <form className="" >
          <input  placeholder="Enter the title" className="text-input title-input input"/>
          <textarea placeholder="Enter the description" className="text-input description input"/>
          <input type="submit" className="submit input"/>
        </form>
      </div>
      <div className="task-cont flex flex-col justify-start items-center">
        hey
      </div>
      <div className="detail-cont flex flex-col justify-start items-center">
          hey
      </div>
    </div>
  )
}

export default HomePage
