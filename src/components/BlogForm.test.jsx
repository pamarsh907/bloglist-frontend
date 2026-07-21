import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('<Blog />', () => {
  beforeEach(() => {

  })

  test('can add new blog', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    //get inputs by label value title, author, url
    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const submitButton = screen.getByText('submit')

    await user.type(titleInput, 'inputting title...')
    await user.type(authorInput, 'inputting author...')
    await user.type(urlInput, 'inputting url...')

    await user.click(submitButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('inputting title...')
    expect(createBlog.mock.calls[0][1]).toBe('inputting author...')
    expect(createBlog.mock.calls[0][2]).toBe('inputting url...')
  })
})