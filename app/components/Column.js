import TaskCard from './TaskCard'
import { columnClass, columnTitle } from './styles'


export default function Column({ title, tasks, onChangeStatus, onSave }) {
  return (
    <div className={columnClass}>
      <h2 className={columnTitle}>{title} ({tasks.length})</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onChangeStatus={onChangeStatus}
          onSave={onSave}
        />
      ))}
    </div>
  )
}
