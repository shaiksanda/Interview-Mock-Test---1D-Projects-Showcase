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
  state = {
    inputValue: categoriesList[0].id,
    data: [],
    isLoading: true,
    isFailure: false,
  }

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
    try {
      const response = await fetch(url, options)
      const resData = await response.json()
      const updatedData = resData.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))
      if (response.ok) {
        this.setState({data: updatedData, isLoading: false})
      } else {
        this.setState({isLoading: false, isFailure: true})
      }
    } catch (error) {
      this.setState({isLoading: false, isFailure: true})
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
      <ul className="api-data-container">
        {data.map(each => (
          <li className="item-data" key={each.id}>
            <img className="image" src={each.imageUrl} alt={each.name} />
            <div className="name-container">
              <p className="name">{each.name}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  handleRetry = () => {
    this.getData()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="button" onClick={this.handleRetry} type="button">
        Retry
      </button>
    </div>
  )

  content = () => {
    const {isLoading, isFailure} = this.state
    if (isLoading) {
      return this.renderLoader()
    }
    if (isFailure) {
      return this.renderFailure()
    }
    return this.renderData()
  }

  render() {
    const {inputValue, data} = this.state
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
          {this.content()}
        </div>
      </div>
    )
  }
}

export default Projects
