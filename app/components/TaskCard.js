'use client'
import { useState } from 'react'
import Button from '@/app/components/Button'
import { taskClass, inputClass, labelClass, smallText, priorityColors } from '@/app/components/styles'
import React from 'react'

const smallButton = 'mr-1.5 mt-2 px-2.5 py-1 text-sm border border-slate-400 rounded cursor-pointer hover:bg-slate-100'

const formatDate =(value) => {
    return new Date(value).toLocaleDateString()
}

export default function TaskCard({task, onChangeStatus, onSave}) {

    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)
    const [editDescription, setEditDescription] = useState(task.description)
    const [editPriority, setEditPriority] = useState(task.priority)
    const [editDeadline, setEditDeadline] = useState(task.deadline)


    const startEdit =() => {
        setEditText(task.text)
        setEditDescription(task.description)
        setEditPriority(task.priority)
        setEditDeadline(task.deadline)
        setIsEditing(true)
    }

    const saveEdit = () => {
        if(editText.trim() === '') {
            alert('Task title cannot be empty')
            return
        }

        const nothingChanged = 
        editText.trim() === task.text &&
        editDescription.trim() === task.description &&
        editPriority === task.priority &&
        editDeadline === task.deadline

        if(!nothingChanged) {
            onSave(task.id, {
                text: editText.trim(),
                description: editDescription.trim(),
                priority: editPriority,
                deadline: editDeadline
            })
        }
        setIsEditing(false)
    }


    if(isEditing) {
        return(
            <div className={taskClass}> 
                <label className = {labelClass} htmlFor={'edit-title'+ task.id}> Task</label>
                <input
                    type="text"
                    id={'edit-title'+ task.id}
                    className={inputClass + ' mb-2'}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <label className = {labelClass} htmlFor={'edit-description'+ task.id}> Description</label>
                <textarea
                    id={'edit-description'+ task.id}
                    rows = {2}
                    className={inputClass + ' mb-2'}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                />
                <label className = {labelClass} htmlFor={'edit-priority'+ task.id}> Priority</label>
                <select
                    id={'edit-priority'+ task.id}
                    className={inputClass + ' mb-2'}
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label className = {labelClass} htmlFor={'edit-deadline'+ task.id}> Deadline</label>
                <input
                    type="date"
                    id={'edit-deadline'+ task.id}
                    className={inputClass + ' mb-2'}
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                />
                <Button className= {smallButton} onClick={saveEdit}>
                    Save
                </Button>
                <Button className= {smallButton} onClick={() => setIsEditing(false)}>
                    Cancel Edit
                </Button>
             </div>
        )
    }

  return (
    <div className={taskClass}>
      <span className={'inline-block text-xs font-semibold capitalize rounded px-2 py-0.5 mb-1.5 ' + priorityColors[task.priority]}>
        {task.priority}
      </span>

      <p className='mb-1 font-medium break-words'>{task.text}</p>

      {task.description !== '' && (
        <p className='text-sm text-slate-600 mb-1.5 break-words'>{task.description}</p>
      )}

      <p className={smallText}>
        Deadline: {task.deadline === '' ? 'No deadline' : formatDate(task.deadline)}
      </p>
      <p className={smallText}>Created: {formatDate(task.createdAt)}</p>

      {task.updatedAt !== null && (
        <p className={smallText}>Updated: {formatDate(task.updatedAt)}</p>
      )}

     
      {task.status === 'todo' && (
        <>
          <Button className={smallButton} onClick={() => onChangeStatus(task.id, 'progress')}>Start</Button>
          <Button className={smallButton} onClick={() => onChangeStatus(task.id, 'cancelled')}>Cancel</Button>
        </>
      )}

      
      {task.status === 'progress' && (
        <>
          <Button className={smallButton} onClick={() => onChangeStatus(task.id, 'done')}>Complete</Button>
          <Button className={smallButton} onClick={() => onChangeStatus(task.id, 'cancelled')}>Cancel</Button>
        </>
      )}

      
      <Button className={smallButton} onClick={startEdit}>Edit</Button>
    </div>
  )
}
