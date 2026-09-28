import React from 'react'

export async function DynamicIcon({ name }: { name: string }) {
  if (!name) return null

  try {
    const prefix = name.substring(0, 2).toLowerCase()
    let lib = prefix

    // Handle numbered versions like fa6, io5
    if (name.startsWith('Fa') && name.match(/^Fa[0-9]/)) {
      lib = name.substring(0, 3).toLowerCase()
    } else if (name.startsWith('Io') && name.match(/^Io[0-9]/)) {
      lib = name.substring(0, 3).toLowerCase()
    }

    let icons: any
    switch (lib) {
      case 'fa': icons = await import('react-icons/fa'); break;
      case 'fa6': icons = await import('react-icons/fa6'); break;
      case 'io': icons = await import('react-icons/io'); break;
      case 'io5': icons = await import('react-icons/io5'); break;
      case 'md': icons = await import('react-icons/md'); break;
      case 'ri': icons = await import('react-icons/ri'); break;
      case 'fi': icons = await import('react-icons/fi'); break;
      case 'gi': icons = await import('react-icons/gi'); break;
      case 'ti': icons = await import('react-icons/ti'); break;
      case 'go': icons = await import('react-icons/go'); break;
      case 'bi': icons = await import('react-icons/bi'); break;
      case 'bs': icons = await import('react-icons/bs'); break;
      case 'cg': icons = await import('react-icons/cg'); break;
      case 'vsc': icons = await import('react-icons/vsc'); break;
      case 'tb': icons = await import('react-icons/tb'); break;
      case 'si': icons = await import('react-icons/si'); break;
      case 'sl': icons = await import('react-icons/sl'); break;
      case 'im': icons = await import('react-icons/im'); break;
      default:
        console.warn(`Library prefix ${lib} not supported in DynamicIcon`);
        return <span className="text-[11px] uppercase tracking-wider">{name}</span>;
    }

    const Icon = icons[name]
    
    if (Icon) {
      return <Icon />
    }
  } catch (error) {
    console.warn("Could not load icon:", name)
  }

  // Fallback to just rendering the text if icon not found
  return <span className="text-[11px] uppercase tracking-wider">{name}</span>
}
