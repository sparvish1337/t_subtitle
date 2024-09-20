# FiveM Subtitle Script using Mantine & ox_lib Zones (chatgpt wrote this)

This resource provides a dynamic subtitle system for **FiveM** using the **Mantine** UI library and **ox_lib** zones. It displays subtitles when players enter predefined zones, such as spheres or boxes, with customizable titles and placeholder text.

## Features

- **Mantine UI**: Smooth, animated subtitle displays with fade-in and fade-out effects.
- **Configurable Zones**: Use spheres or boxes to define trigger areas for subtitles.
- **Custom Subtitles**: Easily set custom title and subtitle text for each zone.
- **ox_lib Integration**: Utilizes **ox_lib** zones to trigger subtitles based on player location.

## Requirements

- **[ox_lib](https://github.com/overextended/ox_lib)**: Library for handling zones.

## Installation

1. Clone or download this repository into your `resources` folder.
   
   ```bash
   git clone https://github.com/your-repo/fivem-subtitle-script.git
   ```

2. Ensure the resource in your `server.cfg`:

   ```plaintext
   ensure t_subtitle
   ```

3. Add **ox_lib** to your `server.cfg` if you haven't done so already.

   ```plaintext
   ensure ox_lib
   ```

4. Edit the `config.lua` file to set up your zones.

## Configuration Example

The `Config.SubtitleZones` table allows you to define areas in the game world where subtitles will be shown. You can create either spherical or box-shaped zones.

Here’s an example configuration:

```lua
Config = {}

Config.SubtitleZones = {
    {
        type = 'sphere',
        name = 'example',
        coords = vector3(123.45, 678.90, 21.00),
        radius = 50.0,
        title = "Inner Voice",
        placeholder = "This place is pretty sketchy, I should get out of here"
    },
    {
        type = 'box',
        name = 'police_station',
        coords = vector3(438.6950, -982.0980, 30.7076),
        size = vector3(10.0, 10.0, 5.0),
        rotation = 90.0,
        title = "Inner Voice",
        placeholder = "Where can I get some help around here"
    }
}
```

### Zone Parameters:

- **type**: The shape of the zone (`sphere` or `box`).
- **name**: A unique identifier for the zone.
- **coords**: The center coordinates of the zone as a `vector3`.
- **radius**: (For `sphere` only) The radius of the spherical zone.
- **size**: (For `box` only) The dimensions of the box zone as a `vector3` (length, width, height).
- **rotation**: (Optional for `box`) The rotation angle of the box zone.
- **title**: The title of the subtitle (e.g., "Inner Voice").
- **placeholder**: The actual subtitle text that will be displayed when the player enters the zone.

## Usage

- **Display Subtitles Manually**: You can trigger subtitles manually with the following command:

   ```
   /subtitle <title> <placeholder>
   ```

   Example:

   ```
   /subtitle "Inner Voice" "I have a strange feeling about this place..."
   ```

- **Automatic Subtitles in Zones**: Subtitles will automatically display when a player enters a configured zone. Once the player exits, the subtitle will fade out.

## Development

To modify the NUI components, you can edit the React-based code inside the `nui` folder. Run the following commands to install dependencies and start the development server:

```bash
cd nui
npm install
npm run dev
```

This will allow you to see live updates in the browser as you develop the NUI.

## Contributing

If you'd like to contribute, feel free to fork this repository and submit a pull request with improvements or bug fixes.
