local function OpenNui(arg)
  SetNuiFocus(arg, false)
  SendNUIMessage({
      action = 'setVisible',
      data = arg
  })
end

RegisterNUICallback('hide-ui', function(_, cb)
  OpenNui(false)
  cb({})
end)

exports('Subtitle', function(title, placeholder)
  OpenNui(true)
  SetNuiFocus(false, false)
  SendNUIMessage({
      action = 'updateData',
      data = {
          title = title,
          placeholder = placeholder
      }
  })
end)

RegisterCommand('subtitle', function(source, args)
  local title = args[1] or "Inner Voice"
  local placeholder = args[2] or "I have a strange feeling about this place..."
  exports['t_subtitle']:Subtitle(title, placeholder)
end, false)

RegisterCommand('subtitle2', function(source, args)
  local title = args[1] or "Inner Voice"
  local placeholder = args[2] or "Test..."
  exports['t_subtitle']:Subtitle(title, placeholder)
end, false)

local function createZones()
  for _, zone in ipairs(Config.SubtitleZones) do
      if zone.type == 'sphere' then
          lib.zones.sphere({
              coords = zone.coords,
              radius = zone.radius,
              onEnter = function()
                  exports['t_subtitle']:Subtitle(zone.title, zone.placeholder)
              end,
              onExit = function()
                OpenNui(false)
              end
          })
      elseif zone.type == 'box' then
          lib.zones.box({
              coords = zone.coords,
              size = zone.size,
              debug = true,
              rotation = zone.rotation or 0,
              onEnter = function()
                  exports['t_subtitle']:Subtitle(zone.title, zone.placeholder)
              end,
              onExit = function()
                OpenNui(false)
              end
          })
      end
  end
end

-- Call the function to create zones
createZones()
