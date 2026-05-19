import { isSupabaseConfigured, supabase } from '../client.js';
import { seedCreators } from '../seedCreators.js';

const STORAGE_KEY = 'creatorverse-creators';

function readLocalCreators() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  const starters = seedCreators.map((creator, index) => ({
    id: index + 1,
    created_at: new Date().toISOString(),
    ...creator
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(starters));
  return starters;
}

function writeLocalCreators(creators) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
}

export async function getCreators() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    if (data.length === 0) {
      const { data: seeded, error: seedError } = await supabase
        .from('creators')
        .insert(seedCreators)
        .select()
        .order('created_at', { ascending: true });

      if (seedError) throw seedError;
      return seeded;
    }

    return data;
  }

  return readLocalCreators();
}

export async function getCreator(id) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  return readLocalCreators().find((creator) => String(creator.id) === String(id));
}

export async function addCreator(creator) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('creators')
      .insert([creator])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const creators = readLocalCreators();
  const newCreator = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...creator
  };

  writeLocalCreators([...creators, newCreator]);
  return newCreator;
}

export async function updateCreator(id, creator) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('creators')
      .update(creator)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const creators = readLocalCreators();
  const updatedCreators = creators.map((currentCreator) =>
    String(currentCreator.id) === String(id)
      ? { ...currentCreator, ...creator }
      : currentCreator
  );

  writeLocalCreators(updatedCreators);
  return updatedCreators.find((currentCreator) => String(currentCreator.id) === String(id));
}

export async function deleteCreator(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('creators').delete().eq('id', id);

    if (error) throw error;
    return;
  }

  writeLocalCreators(readLocalCreators().filter((creator) => String(creator.id) !== String(id)));
}
