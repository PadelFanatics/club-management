import React, { useState, useEffect } from 'react';
import { PricingRules } from './PricingRules';
import { supabase } from '../../lib/supabase';
import type { Court } from '../../types';

interface PricingTabProps {
  court: Court;
}

export function PricingTab({ court }: PricingTabProps) {
  const [rules, setRules] = useState<any[]>([]);

  useEffect(() => {
    loadPricingRules();
  }, [court.id]);

  const loadPricingRules = async () => {
    const { data } = await supabase
      .from('pricing_rules')
      .select('*')
      .eq('court_id', court.id)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });

    if (data) {
      setRules(data);
    }
  };

  const handleAddRule = async (rule: Omit<any, 'id'>) => {
    const { data, error } = await supabase
      .from('pricing_rules')
      .insert([{ ...rule, court_id: court.id }])
      .select()
      .single();

    if (data && !error) {
      setRules([...rules, data]);
    }
  };

  const handleUpdateRule = async (id: string, updates: Partial<any>) => {
    const { data, error } = await supabase
      .from('pricing_rules')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (data && !error) {
      setRules(rules.map(rule => rule.id === id ? data : rule));
    }
  };

  const handleDeleteRule = async (id: string) => {
    const { error } = await supabase
      .from('pricing_rules')
      .delete()
      .eq('id', id);

    if (!error) {
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  return (
    <PricingRules
      court={court}
      rules={rules}
      onAddRule={handleAddRule}
      onUpdateRule={handleUpdateRule}
      onDeleteRule={handleDeleteRule}
    />
  );
}