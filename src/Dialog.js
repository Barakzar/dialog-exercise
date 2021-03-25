import React, {useState, useRef, useEffect} from 'react'
import {createPortal} from 'react-dom'

function Dialog({children,location}) {
    const [isOpen, setIsOpen] = useState(false)
    const dialogInputRef = useRef(null)
    const openDialogBtn = useRef(null)
    const closeDialogBtn = useRef(null)

    const toggle =  () => {
         setIsOpen(  prev => !prev);
    }

    useEffect(() => {
        if (isOpen) {
            dialogInputRef.current.focus()
        } else {
            openDialogBtn.current.focus()
        }
    },[isOpen])


    return ( createPortal(
        <section>
            <div id = "sectionContent" aria-hidden = {isOpen?'true':null}>
                <button>Focus restored to last focused elem --&gt;</button>
                <button 
                    ref={openDialogBtn} 
                    onClick={toggle}
                    >
                    Open Dialog
                </button>
                {children}
            </div>
            <div 
                tabIndex="-1"
                id="dialogPlaceholder" 
                onKeyDown={e => {
                    if (e.key === 'Escape') {
                        toggle()
                    }
                }}
                style={{ display:isOpen?'block':'none',position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(255,255,255,100)', border:'1px solid red'}}>
                <div 
                    className='visual-overlay'
                    onClick={toggle} 
                    style={{position:'relative',width:'100%',height:'100%'}}
                    >overlay
                </div>
                <div role='dialog' style={{position:'absolute',top:0}}>
                    <div role='document'>
                        <input 
                            type="text" 
                            ref={dialogInputRef}
                            onKeyDown={e => {
                                if (e.key === 'Tab' && e.shiftKey) {
                                    e.preventDefault()
                                    closeDialogBtn.current.focus()
                                }
                            }}
                            placeholder='On opening, focus set here'
                        />
                        <a href="#"> Tab / shift-tab cycled - trapped inside.😊 </a>
                        <button 
                            ref={closeDialogBtn}
                            onClick={toggle}
                            onKeyDown={e => {
                                if (e.key === 'Tab' && !e.shiftKey) {
                                    e.preventDefault()
                                    dialogInputRef.current.focus()
                                }
                            }}
                            >Close Dialog
                        </button>
                        <p>- Hitting Esc or any click outside the dialog somewhere on overlay, also close the dialog. -</p>
                    </div>
                </div>
            </div>
        </section>,
        location
    )
    )
}

export default Dialog