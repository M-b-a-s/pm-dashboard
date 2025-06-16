import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type UseDataOptions = {
  orderBy?: string
  ascending?: boolean
  filter?: { column: string; value: any }
}

export function useData<T = any>(
  table: string,
  options: UseDataOptions = {}
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let query = supabase.from(table).select("*")
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? false })
      }
      if (options.filter) {
        query = query.eq(options.filter.column, options.filter.value)
      }
      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setData(data)
      }
      setLoading(false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, JSON.stringify(options)])

  return { data, loading, error, setData }
}