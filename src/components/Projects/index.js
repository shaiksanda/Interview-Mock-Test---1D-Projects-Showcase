import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Projects extends Component {
  state = {inputValue: categoriesList[0].id, data: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {inputValue} = this.state
    this.setState({isLoading: true})
    const url = `https://apis.ccbp.in/ps/projects?category=${inputValue}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const resData = await response.json()
    const updatedData = resData.projects.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      name: each.name,
    }))
    if (response.ok) {
      this.setState({data: updatedData, isLoading: false})
    }
  }

  handleInputChange = event => {
    this.setState({inputValue: event.target.value}, this.getData)
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="Oval" width={100} height={100} color="green" />
    </div>
  )

  renderData = () => {
    const {data} = this.state
    return (
      <div className="api-data-container">
        {data.map(each => (
          <div className="item-data">
            <img className="image" src={each.imageUrl} alt={each.name} />
            <div className="name-container">
              <p className="name">{each.name}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {inputValue, data, isLoading} = this.state
    console.log(data, inputValue)
    return (
      <div>
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </div>
        <div className="projects-container">
          <select
            onChange={this.handleInputChange}
            value={inputValue}
            className="dropdown"
          >
            {categoriesList.map(each => (
              <option value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          {isLoading ? this.renderLoader() : this.renderData()}
        </div>
      </div>
    )
  }
}

export default Projects
