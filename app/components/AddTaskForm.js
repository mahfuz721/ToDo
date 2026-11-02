'use client'
import { useState } from 'react'
import Button from './Button'
import { inputClass, labelClass } from './styles'

export default function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('mid')
  const [deadline, setDeadline] = useState('')

  function handleAdd() {
    if (text.trim() === '') {
      return
    }

    
    onAdd({
      text: text.trim(),
      description: description.trim(),
      priority: priority,
      deadline: deadline,
    })

    
    setText('')
    setDescription('')
    setPriority('mid')
    setDeadline('')
  }

  return (
    <div className='bg-white border border-slate-300 rounded-lg p-4 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
      <div>
        <label className={labelClass} htmlFor='new-title'>Task</label>
        <input
          id='new-title'
          type='text'
          placeholder='What needs doing?'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor='new-priority'>Priority</label>
        <select
          id='new-priority'
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={inputClass}
        >
          <option value='high'>High</option>
          <option value='mid'>Mid</option>
          <option value='low'>Low</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor='new-description'>Description</label>
        <textarea
          id='new-description'
          rows={2}
          placeholder='Add more details (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor='new-deadline'>Deadline</label>
        <input
          id='new-deadline'
          type='datetime-local'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className='md:col-span-2'>
        <Button
          onClick={handleAdd}
          className='bg-teal-700 text-white rounded-md px-5 py-2 text-base cursor-pointer hover:bg-teal-800'
        >
          Add Task
        </Button>
      </div>
    </div>
  )
}
