import React from 'react'
import Dialog from './Dialog'
class App extends React.Component {
    render() {
        return (
            <div>
                {/* Choose where to locate the dialog, via 'props.location'. */}
                <Dialog location={document.getElementById('dialog-root')}>

                    {/* Write here some content and it will appear in id="sectionContent", via 'props.children'. */}
                    <p>- This content is from 'props.children' -</p>
                    
                </Dialog>
            </div>
        )
    }
}
export default App