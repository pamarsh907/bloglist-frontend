import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('<Blog />', () => {
  beforeEach(() => {

  })

  test('renders content', () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    render(
      <Blog blog={blog} />
    )

    const authorElement = screen.getByText('title', { exact: false })
    expect(authorElement).toBeDefined()

    const titleElement = screen.getByText('author', { exact: false })
    expect(titleElement).toBeDefined()

    const urlElement = screen.queryByText('url.com')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('99')
    expect(likesElement).toBeNull()
  })

  test('renders url and likes when clicked', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    render(
      <Blog blog={blog} />
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const urlElement = screen.getByText('url.com', { exact: false })
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('99', { exact: false })
    expect(likesElement).toBeDefined()
  })

  test('clicks like button twice', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} updateLikes={mockHandler} canLike={true}/>
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('unauthenticated user cannot see like or delete', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} updateLikes={mockHandler} remove={ () => {} } canRemove={false} canLike={false}/>
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('unauthenticed user can see like and delete own blog', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} updateLikes={mockHandler} remove={ () => {} } canRemove={true} canLike={true}/>
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.getByText('remove')).toBeDefined()
  })

  test('unauthenticed user can see like but no delete other blogs', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url.com',
      likes: '99',
      user : 'user'
    }

    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} updateLikes={mockHandler} remove={ () => {} } canRemove={false} canLike={true}/>
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.queryByText('like')).toBeDefined()
    expect(screen.queryByText('remove')).toBeNull()
  })
})