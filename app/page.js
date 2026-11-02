'use client'
import { useState } from 'react'
import AddTaskForm from '@/app/components/AddTaskForm.js'
import Column from '@/app/components/Column'

export default function Page() {
 
  const [tasks, setTasks] = useState([])

 
  function addTask(data) {
    const taskToAdd = {
      id: Date.now(),
      text: data.text,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      createdAt: Date.now(),
      updatedAt: null,
      status: 'todo',
    }

    setTasks(tasks.concat([taskToAdd]))
  }

  
  function changeStatus(id, newStatus) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        
        return { ...task, status: newStatus }
      }
      return task
    })
    setTasks(updatedTasks)
  }

 function saveEdit(id, changes) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          text: changes.text,
          description: changes.description,
          priority: changes.priority,
          deadline: changes.deadline,
          updatedAt: Date.now(), 
        }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const todoTasks = tasks.filter((task) => task.status === 'todo')
  const progressTasks = tasks.filter((task) => task.status === 'progress')
  const doneTasks = tasks.filter((task) => task.status === 'done')
  const cancelledTasks = tasks.filter((task) => task.status === 'cancelled')

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold mb-5'>ToDo Board</h1>

      <AddTaskForm onAdd={addTask} />

      <div className='grid grid-cols-1 md:grid-cols-4 gap-3.5 items-start'>
        <Column title='All Tasks' tasks={todoTasks} onChangeStatus={changeStatus} onSave={saveEdit} />
        <Column title='In Progress' tasks={progressTasks} onChangeStatus={changeStatus} onSave={saveEdit} />
        <Column title='Done' tasks={doneTasks} onChangeStatus={changeStatus} onSave={saveEdit} />
        <Column title='Cancelled' tasks={cancelledTasks} onChangeStatus={changeStatus} onSave={saveEdit} />
      </div>
    </div>
  )
}
