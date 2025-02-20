import { Config } from 'core/Config/domain/Config'
import fetchMock from 'jest-fetch-mock'
import { mock } from 'jest-mock-extended'
import { apiBillingRepository } from 'core/Billing/infrastructure/apiBillingRepository'
import { BillingRepository } from 'core/Billing/domain/BillingRepository'
import billingAddressesFixture from './__fixtures__/billingAddressesFixture.json'
import newBillingAddressFixture from './__fixtures__/newBillingAddressFixture.json'
import {
  aBillingAddressCollection,
  aEditBillingAddress,
  aNewBillingAddress
} from 'core/Billing/domain/__tests__/BillingBuilder'

describe('apiBillingRepository', () => {
  let billingRepository: BillingRepository

  beforeAll(() => {
    billingRepository = apiBillingRepository({ config: mock<Config>() })
  })

  it('makes billing addresses request and parses response', async () => {
    fetchMock.doMock(JSON.stringify(billingAddressesFixture))

    const data = await billingRepository.all()

    expect(data).toEqual(aBillingAddressCollection())
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/user-invoice-data'),
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('makes add new billing addresses request', async () => {
    fetchMock.doMock(JSON.stringify({}))

    await billingRepository.add(aNewBillingAddress())

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/user-invoice-data'),
      expect.objectContaining({ method: 'POST', body: JSON.stringify(newBillingAddressFixture) })
    )
  })

  it('makes select billing address request', async () => {
    fetchMock.doMock(JSON.stringify({}))

    await billingRepository.select('1')

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/user-invoice-data/1/select'),
      expect.objectContaining({ method: 'PUT' })
    )
  })

  it('makes delete billing address request', async () => {
    fetchMock.doMock(JSON.stringify({}))

    await billingRepository.delete('1')

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/user-invoice-data/1'),
      expect.objectContaining({ method: 'DELETE' })
    )
  })

  it('makes edit billing address request', async () => {
    fetchMock.doMock(JSON.stringify({}))

    await billingRepository.edit(aEditBillingAddress())

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/user-invoice-data/123456789'),
      expect.objectContaining({ method: 'PUT' })
    )
  })
})
