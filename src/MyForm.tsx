import * as React from 'react'
import QbForm from '../QbForm-reactjs/QbForm-reactjs'

type MyFormProps = { }
type MyFormState = { }

export default class MyForm extends React.Component<MyFormProps,MyFormState> {

  qbForm: QbForm

  static schema: Object = {
    type: 'object',
    properties: {
      field: {
        type: 'string'
      },
      colorSwitcher: {
        type: 'boolean',
        _display: 'switch',
        _frameTopText: 'Switch the field color to yellow',
        _border: 'solid 2px red'
      }
    }
  }

  constructor (props: MyFormProps) {
    super(props)
    this.qbForm = new QbForm({ Schema: MyForm.schema })
    this.qbForm.setCallback('/colorSwitcher', 'onChange', this.changeFieldColor.bind(this))
  }

  changeFieldColor (elementPath: string[], cbName: string, input: object | null): boolean {
    if (input) {
      const newValue = input['newValue' as keyof typeof input]
      if (newValue === 1) {
        this.qbForm.setProperty('/field','_backgroundColor','yellow')
      } else {
        this.qbForm.setProperty('/field','_backgroundColor','#fafaf8')
      }
    }
    return true
  }

  submit (): void {
    alert(JSON.stringify(this.qbForm.getProperty('/', 'value')))
  }

  render () {
    return (
      <div style={ {
        border: 'solid 2px darkblue',
        textAlign: 'center',
        width: '400px',
        padding: '20px' } }>
        { this.qbForm.render() }
        <button onClick={this.submit.bind(this)}>Submit</button>
      </div>)
  }
}
