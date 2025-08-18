# UI/UX Guidelines

## Design Philosophy
**Terminal/CLI Aesthetic**: The application should emulate a command-line interface running in a browser, providing a familiar environment for technical users while maintaining modern usability.

## Visual Design Principles

### Color Schemes
**Dark Mode (Default)**
- Background: `#0d1117` (GitHub dark)
- Primary text: `#c9d1d9` (light gray)
- Secondary text: `#8b949e` (muted gray)
- Accent: `#58a6ff` (blue)
- Success: `#3fb950` (green)
- Warning: `#d29922` (yellow)
- Error: `#f85149` (red)
- Border: `#30363d` (dark gray)

**Light Mode**
- Background: `#ffffff` (white)
- Primary text: `#24292f` (dark gray)
- Secondary text: `#656d76` (medium gray)
- Accent: `#0969da` (blue)
- Success: `#1a7f37` (green)
- Warning: `#9a6700` (yellow)
- Error: `#cf222e` (red)
- Border: `#d0d7de` (light gray)

### Typography
- **Primary Font**: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace`
- **Font Sizes**: 
  - Small: `12px`
  - Normal: `14px`
  - Large: `16px`
  - Header: `18px`
- **Line Height**: `1.5`
- **Character Spacing**: `0.02em`

### Layout Principles
- **Grid-based layout**: Use consistent spacing units (8px, 16px, 24px, 32px)
- **Minimal padding**: Tight spacing like terminal applications
- **Sharp corners**: No rounded borders (except for buttons/inputs)
- **Monospace alignment**: All text should align on character grid
- **ASCII-style borders**: Use characters like `│`, `─`, `┌`, `┐` for visual separation

## Component Guidelines

### Main Interface Layout
```
┌─ Intertwinked ─────────────────────────────────────────┐
│ [●] Connected Peers          │ Chat Tabs              │
│ ├─ alice@peer123            │ [alice] [bob] [+]      │
│ ├─ bob@peer456              │                        │
│ ├─ charlie@peer789 (DEAD)   │ ┌─ Chat: alice ──────┐ │
│ └─ diana@peer012            │ │ alice: hey there   │ │
│                             │ │ you: hello!        │ │
│                             │ │ alice: how are you?│ │
│                             │ │                    │ │
│                             │ └─ > type message...─┘ │
└─────────────────────────────────────────────────────────┘
```

### Interactive Elements
- **Buttons**: Bracket style `[Submit]` or `[Cancel]`
- **Input Fields**: Underlined with cursor `> input_text_`
- **Tabs**: Bracketed active state `[active]` vs `inactive`
- **Scrollbars**: ASCII-style using `│` and `█` characters
- **Loading States**: Animated dots `...` or spinner characters

### Status Indicators
- **Online**: `●` (green dot)
- **Offline**: `○` (empty circle)
- **Dead Peer**: `✗` (red X) with strikethrough text
- **Typing**: `...` (animated dots)
- **Unread Messages**: `(3)` (number in parentheses)

### Animation Guidelines
- **Minimal animations**: Subtle fade-ins, no bouncing or sliding
- **Terminal-like transitions**: Instant text appearance, character-by-character typing effects
- **Cursor blinking**: Standard terminal cursor behavior
- **Duration**: Keep animations under 200ms

## Responsive Behavior
- **Mobile**: Stack sidebar below chat area, collapsible
- **Tablet**: Narrow sidebar, full-width chat
- **Desktop**: Standard two-column layout
- **Breakpoints**: 
  - Mobile: `< 768px`
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`

## Accessibility
- **High contrast**: Ensure 4.5:1 contrast ratio minimum
- **Keyboard navigation**: Full keyboard support with visible focus indicators
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Font scaling**: Support browser zoom up to 200%

## Theme Toggle
- **Position**: Top-right corner as `[Light]`/`[Dark]` button
- **Persistence**: Save preference in localStorage
- **Transition**: Instant theme switching, no animation
- **Default**: Dark mode

## Error States
- **Connection errors**: Red text with `[ERROR]` prefix
- **Failed messages**: Strike-through with retry option
- **Network issues**: Yellow warning with `[WARN]` prefix
- **System messages**: Gray text with `[SYS]` prefix

## File Sharing UI
- **File uploads**: Progress bar using ASCII characters `[████████░░] 80%`
- **File links**: Underlined with file icon `📄 document.pdf`
- **Download status**: `[↓ downloading...]` or `[✓ complete]`